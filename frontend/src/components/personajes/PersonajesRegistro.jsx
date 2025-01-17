import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RequireAuth } from "../RequiereAuth";

export default function PersonajesRegistro({
  AccionABMC,
  Poderes,
  Equipos,
  Franquicias,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  const [nombresPoderes, setNombresPoderes] = useState(new Map());
  useEffect(() => {
    let mapaNombresPoderes = new Map();
    Poderes.forEach((Poder) => {
      if (!mapaNombresPoderes.has(Poder.IdPersonaje)) {
        mapaNombresPoderes.set(Poder.IdPersonaje, [Poder.NombrePoder]);
      } else {
        mapaNombresPoderes.get(Poder.IdPersonaje).push(Poder.NombrePoder);
      }
    });
    setNombresPoderes(mapaNombresPoderes);
  }, []);

  return (
    <RequireAuth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid">

          <fieldset disabled={AccionABMC === "C"}>

            {/* campo Nombre */}
            <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="Nombre">
                  Nombre<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <input
                  type="text"
                  {...register("Nombre", {
                    required: { value: true, message: "Nombre es requerido" },
                    minLength: {
                      value: 1,
                      message: "Nombre debe tener al menos 1 caracter",
                    },
                    maxLength: {
                      value: 55,
                      message: "Nombre debe tener como máximo 55 caracteres",
                    },
                  })}
                  autoFocus
                  className={
                    "form-control " + (errors?.Nombre ? "is-invalid" : "")
                  }
                />
                {errors?.Nombre && touchedFields.Nombre && (
                  <div className="invalid-feedback">
                    {errors?.Nombre?.message}
                  </div>
                )}
              </div>
            </div>

            {/* campo FechaAparicion */}
            <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="FechaAparicion">
                  Fecha Aparicion<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <input
                  type="date"
                  {...register("FechaAparicion", {
                    required: { value: true, message: "Fecha Aparicion es requerido" }
                  })}
                  className={
                    "form-control " + (errors?.FechaAparicion ? "is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">
                  {errors?.FechaAparicion?.message}
                </div>
              </div>
            </div>

            {/* campo PuntosPoder */}
            <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="PuntosPoder">
                  Puntos Poder<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <input
                  type="number"
                  {...register("PuntosPoder", {
                    required: { value: true, message: "Puntos Poder es requerido" },
                    min: {
                      value: 0,
                      message: "Puntos Poder debe ser mayor a 0",
                    },
                    max: {
                      value: 100,
                      message: "Puntos Poder debe ser menor o igual a 100",
                    },
                  })}
                  className={
                    "form-control " + (errors?.PuntosPoder ? "is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">{errors?.PuntosPoder?.message}</div>
              </div>
            </div>

            {/* campo Poderes */}
            {AccionABMC === "C" && nombresPoderes.has(Item.Id) && (
              <div className="row">
                <div className="col-sm-4 col-md-3 offset-md-1">
                  <label className="col-form-label" htmlFor="Poderes">
                    Poderes<span className="text-danger">*</span>:
                  </label>
                </div>
                <div className="col-sm-8 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="Poderes"
                    value={nombresPoderes.get(Item.Id).join(", ")}
                    readOnly
                  />
                </div>
              </div>
            )}

            {/* campo IdEquipo */}
            <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="IdEquipo">
                  Equipo<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <select
                  {...register("IdEquipo", {
                    required: { value: true, message: "Equipo es requerido" },
                  })}
                  className={
                    "form-control " +
                    (errors?.IdEquipo ? "is-invalid" : "")
                  }
                >
                  <option value="" key={0}></option>
                  {Equipos?.map((x) => (
                    <option key={x.Id} value={x.Id}>
                      {x.Nombre}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  {errors?.IdEquipo?.message}
                </div>
              </div>
            </div>

            {/* campo IdFranquicia */}
            <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="IdFranquicia">
                  Franquicia<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <select
                  {...register("IdFranquicia", {
                    required: { value: true, message: "Franquicia Equipo es requerido" },
                  })}
                  className={
                    "form-control " +
                    (errors?.IdFranquicia ? "is-invalid" : "")
                  }
                >
                  <option value="" key={0}></option>
                  {Franquicias?.map((x) => (
                    <option key={x.Id} value={x.Id}>
                      {x.Nombre}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  {errors?.IdFranquicia?.message}
                </div>
              </div>
            </div>

            {/* campo Activo */}
            <div className="row">
              <div className="col-sm-4 col-md-3 offset-md-1">
                <label className="col-form-label" htmlFor="Activo">
                  Activo<span className="text-danger">*</span>:
                </label>
              </div>
              <div className="col-sm-8 col-md-6">
                <select
                  name="Activo"
                  {...register("Activo", {
                    required: { value: true, message: "Activo es requerido" },
                  })}
                  className={
                    "form-control" + (errors?.Activo ? " is-invalid" : "")
                  }
                  disabled
                >
                  <option value={null}></option>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
                <div className="invalid-feedback">{errors?.Activo?.message}</div>
              </div>
            </div>

          </fieldset>

          {/* Botones Grabar, Cancelar/Volver' */}
          <hr />
          <div className="row justify-content-center">
            <div className="col text-center botones">
              {AccionABMC !== "C" && (
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-check"></i> Grabar
                </button>
              )}
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => Volver()}
              >
                <i className="fa fa-undo"></i>
                {AccionABMC === "C" ? " Volver" : " Cancelar"}
              </button>
            </div>
          </div>

          {/* texto: Revisar los datos ingresados... */}
          {!isValid && isSubmitted && (
            <div className="row alert alert-danger mensajesAlert">
              <i className="fa fa-exclamation-sign"></i>
              Revisar los datos ingresados...
            </div>
          )}

        </div>
      </form>
    </RequireAuth>
  );
}

