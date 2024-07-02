import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PeliculasRegistro({
  AccionABMC,
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

  return (
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

          {/* campo FechaEstreno */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaEstreno">
                Fecha Estreno<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaEstreno", {
                  required: { value: true, message: "Fecha Estreno es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaEstreno ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaEstreno?.message}
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
                  required: { value: true, message: "Franquicia es requerido" },
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

          {/* campo Rating */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Rating">
                Rating<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                step=".1"
                {...register("Rating", {
                  required: { value: true, message: "Rating es requerido" },
                  min: {
                    value: 0,
                    message: "Rating debe ser mayor a 0",
                  },
                  max: {
                    value: 10,
                    message: "Puntos Poder debe ser menor o igual a 10",
                  },
                })}
                className={
                  "form-control " + (errors?.Rating ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Rating?.message}</div>
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
  );
}

