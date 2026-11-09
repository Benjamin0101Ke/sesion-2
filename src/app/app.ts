import { Component, inject } from '@angular/core';
import { Estudiante } from './models/estudiante';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from './services/estudiantes';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo: string = 'Sistemas de Gestion Academica';

  private estudianteService = inject(EstudianteService);
  estudiantes = this.estudianteService.obtenerEstudiantes();

  nuevoEstudiante: Estudiante = {
    id: 0,
    nombre: '',
    correo: '',
    carrera: '',
    telefono: ''
  };

  guardarEstudiante() {
    if (this.nuevoEstudiante.id === 0) {
      this.estudianteService.agregarEstudiante({ ...this.nuevoEstudiante });
    } else {
      this.estudianteService.actualizarEstudiante(this.nuevoEstudiante);
    }
    this.limpiarFormulario();
  }

  seleccionarParaEditar(estudiante: Estudiante) {
    this.nuevoEstudiante = { ...estudiante };
  }

  eliminar(id: number) {
    if (!window.confirm('¿Quieres eliminar a este estudiante?')) {
      return;
    }

    this.estudianteService.eliminarEstudiante(id);
  }

  limpiarFormulario() {
    this.nuevoEstudiante = {
      id: 0,
      nombre: '',
      correo: '',
      carrera: '',
      telefono: ''
    };
  }
}