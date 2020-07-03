<template>
  <div id="app">
    <h1>Notas</h1>
    <div>
      <b-button variant="primary" @click="addBtn">+ Añadir nueva nota</b-button>
    </div>
    <br />
    <div class="col-md-12">
      <b-table striped hover :items="notes" :fields="fields">
        <template v-slot:cell(action)="data">
          <b-button size="sm" variant="danger" @click="deleteBtn(data)">Eliminar</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { getNotes, addNotes, deleteNote } from "./api";
import Swal from "sweetalert2";

export default {
  name: "App",
  data: () => ({
    fields: [
      { key: "id", label: "ID" },
      { key: "end_date", label: "Fecha de finalización" },
      { key: "note", label: "Nota" },
      { key: "adjunto", label: "Fichero adjunto" },
      { key: "task", label: "Tarea" },
      { key: "tag", label: "Etiqueta" },
      { key: "type", label: "Tipo" },
      { key: "action", label: "Acción" }
    ],
    notes: []
  }),
  methods: {
    async loadNotes() {
      this.notes = await getNotes();
    },
    async addBtn() {
      const { value: formValues } = await Swal.fire({
        title: "Rellena el formulario: ",
        html:
          // form en línea, construido aparte y se le ha aplicado html minify
          '<form><div class="form-group"><label class="font-weight-bold">Fecha de Finalización</label><input type="datetime-local" class="form-control" id="end_date"></div><div class="form-group"><label class="font-weight-bold">Nota</label><textarea class="form-control" id="note" rows="3"></textarea></div><div class="form-group"><label class="font-weight-bold">Fichero adjunto</label><input type="text" class="form-control-file" id="adjunto"></div><div class="form-check"><input class="form-check-input" type="checkbox" id="task" value="true"><label class="form-check-label font-weight-bold">Tarea</label></div><br><div class="form-group"><label class="font-weight-bold">Etiqueta</label><input class="form-control" placeholder="" id="tag"></div><div class="form-group"><label class="font-weight-bold">Tipo</label><select class="form-control" id="type"><option>Primero</option><option>Segundo</option><option>Tercero</option></select></div><div class="form-group"><label class="font-weight-bold">Usuario</label><select class="form-control" id="user"><option>alex</option></select></div></form>',

        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          return {
            end_date: document.getElementById("end_date").value,
            note: document.getElementById("note").value,
            adjunto: document.getElementById("adjunto").value,
            task: document.getElementById("task").checked,
            tag: document.getElementById("tag").value,
            type: document.getElementById("type").value
          };
        }
      });

      if (formValues) {
        console.log(formValues);

        addNotes(formValues);
        Swal.fire("¡Añadido!", "Un nuevo registro ha sido añadido.", "success");

        setTimeout(() => {
          this.loadNotes();
        }, 1000);
      }
    },
    async deleteBtn(data) {
      console.log(data.item.id);
      Swal.fire({
        title: "¿De verdad quieres borrar este registro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          deleteNote(data.item.id);
          Swal.fire("¡Borrado!", "Este registro ha sido borrado", "success");
          setTimeout(() => {
            this.loadNotes();
          }, 1000);
        }
      });
    }
  },
  created() {
    this.loadNotes();
  }
};
</script>

<style>
#app {
  padding: 50px;
}
</style>

