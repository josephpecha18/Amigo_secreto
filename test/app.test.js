/**
 * @jest-environment jsdom
 */

import { jest } from "@jest/globals";
import fs from "fs";
import path from "path";

const htmlPath = path.resolve(process.cwd(), "index.html");
const appPath  = path.resolve(process.cwd(), "app.js");

// Carga HTML y evalúa app.js, exponiendo funciones al window
function loadDOM() {
  const html = fs.readFileSync(htmlPath, "utf8");
  document.documentElement.innerHTML = html;

  // Mock alert
  jest.spyOn(window, "alert").mockImplementation(() => {});

  // Evalúa el código y luego "publica" las funciones usadas por el HTML/test
  const appCode = fs.readFileSync(appPath, "utf8");
  // eslint-disable-next-line no-eval
  eval(`
    ${appCode}
    // Importante: hacer accesibles las funciones globales que el HTML llama con onclick
    if (typeof agregarAmigo !== 'undefined')   window.agregarAmigo   = agregarAmigo;
    if (typeof sortearAmigo !== 'undefined')   window.sortearAmigo   = sortearAmigo;
    if (typeof reiniciarAmigos !== 'undefined')window.reiniciarAmigos= reiniciarAmigos;
  `);
}

function getEl(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`No se encontró #${id}`);
  return el;
}

// Helper para agregar un nombre usando la lógica real (sin depender del onclick)
function addName(name) {
  const input = getEl("amigo");
  input.value = name;
  if (typeof window.agregarAmigo !== "function") {
    throw new Error("window.agregarAmigo no está disponible");
  }
  window.agregarAmigo();
}

describe("Amigo Secreto app", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = "";
  });

  test("estado inicial: sort y refresh deshabilitados", () => {
    loadDOM();
    expect(getEl("button-sort").disabled).toBe(true);
    expect(getEl("button-refre").disabled).toBe(true);
    // (Opcional) si tu CSS inicial pone estas clases:
    // expect(getEl("button-sort").className).toBe("button-disabled");
    // expect(getEl("button-refre").className).toBe("button-disabled");
  });

  test("no permite nombre vacío", () => {
    loadDOM();
    // Simulamos click en "Añadir" invocando la función directamente sin valor
    window.agregarAmigo();
    expect(window.alert).toHaveBeenLastCalledWith("Por favor, inserte un nombre.");
    expect(getEl("listaAmigos").children.length).toBe(0);
  });

  test("valida 'Nombre Apellido' con mayúscula inicial", () => {
    loadDOM();
    const malos = ["john doe", "John", "John doe", "John  Doe", "John D0e", "John "];
    for (const n of malos) {
      getEl("amigo").value = n;
      window.agregarAmigo(); // en vez de click del botón
      expect(window.alert).toHaveBeenLastCalledWith(
        "Por favor, ingrese nombre y apellido, ambas palabras con la inicial en mayúscula."
      );
      expect(getEl("listaAmigos").children.length).toBe(0);
    }
  });

  test("agrega un nombre válido y crea botón eliminar", () => {
    loadDOM();
    addName("Jose Perez");
    const list = getEl("listaAmigos");
    expect(list.children.length).toBe(1);
    const delBtn = list.children[0].querySelector("button");
    expect(delBtn).toBeTruthy();
    expect(delBtn.classList.contains("eliminar-button")).toBe(true);
  });

  test("bloquea duplicados", () => {
    loadDOM();
    addName("Maria Gomez");
    addName("Maria Gomez");
    expect(window.alert).toHaveBeenLastCalledWith(
      "El nombre ya fue ingresado, por favor ingrese otro nombre."
    );
    expect(getEl("listaAmigos").children.length).toBe(1);
  });

  test("habilita 'Sortear' solo con 2+ nombres", () => {
    loadDOM();
    addName("Luis Torres");
    expect(getEl("button-sort").disabled).toBe(true);
    addName("Ana Rojas");
    expect(getEl("button-sort").disabled).toBe(false);
  });

  test("elimina un amigo con el botón correspondiente", () => {
    loadDOM();
    addName("Juan Diaz");
    addName("Sara Ruiz");
    const list = getEl("listaAmigos");
    // Clic en el primer botón eliminar
    const firstDelBtn = list.querySelector("li button");
    expect(firstDelBtn).toBeTruthy();
    firstDelBtn.click();
    expect(list.textContent).toContain("Sara Ruiz");
    expect(list.textContent).not.toContain("Juan Diaz");
  });

  test("reiniciar limpia todo tras sortear", () => {
    loadDOM();
    addName("Ariel Prado");
    addName("Beto Lima");

    // sortear -> recién ahí tu app habilita 'Reiniciar'
    getEl("button-sort").click();

    const refreshBtn = getEl("button-refre");
    expect(refreshBtn.disabled).toBe(false);
    refreshBtn.click();

    expect(getEl("listaAmigos").children.length).toBe(0);
    expect(getEl("resultado").children.length).toBe(0);
    expect(getEl("amigo").value).toBe("");
    expect(getEl("button-sort").disabled).toBe(true);
  });

  test("sortearAmigo: mensajes correctos con 0 y 1 nombre (llamando función)", () => {
    loadDOM();
    // 0 nombres
    expect(typeof window.sortearAmigo).toBe("function");
    window.sortearAmigo();
    expect(window.alert).toHaveBeenLastCalledWith(
      "Por favor, ingrese al menos un nombre para sortear."
    );

    // 1 nombre
    addName("Carlos Pinto");
    window.sortearAmigo();
    expect(window.alert).toHaveBeenLastCalledWith(
      "No se puede sortear, ingrese al menos dos nombres."
    );
  });

  test("sortearAmigo con 2+ nombres genera resultado y bloquea botones", () => {
    loadDOM();
    addName("Alice Smith");
    addName("Bob Brown");
    getEl("button-sort").click();

    expect(getEl("resultado").children.length).toBe(1);

    // Los botones eliminar deben conservar .eliminar-button y tener estado deshabilitado
    const delButtons = document.querySelectorAll(".eliminar-button");
    expect(delButtons.length).toBe(2);
    delButtons.forEach((b) => {
      expect(b.disabled).toBe(true);
      // Según tu cambio, ahora agregas la clase en vez de reemplazarla
      expect(b.classList.contains("button-disabled-ul")).toBe(true);
    });
  });

  test("limpia el input después de agregar", () => {
    loadDOM();
    const input = getEl("amigo");
    input.value = "Carlos Pinto";
    window.agregarAmigo();
    expect(getEl("amigo").value).toBe("");
  });
});
