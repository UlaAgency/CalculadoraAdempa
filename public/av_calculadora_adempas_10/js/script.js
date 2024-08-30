"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};

let slideDiez = {
   validateCounnt: 0,
   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         document.dispatchEvent(new Event('configLoaded'));
         if(veeva.calculadora.procedimientos.indexSlider !== 5) updateSliderValue(veeva.calculadora.procedimientos.indexSlider);
      } else {
         setTimeout(() => {
            slideDiez.openAlert('bd-clear');
         }, 1400);
      }
   },

   calcCostProcedimientos: function () {
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });
      const tableHAP = document.querySelector('.tableHAP');
      // const tableHTEC = document.querySelector('.tableHPTEC');
      let procedimientosHAP = veeva.calculadora.referencias.procedimientos.HAP;
      let procedimientosHTEC = veeva.calculadora.referencias.procedimientos.HTEC;
      veeva.calculadora.procedimientos.HAPTotal.bajo = 0;
      veeva.calculadora.procedimientos.HAPTotal.intermedio = 0;
      veeva.calculadora.procedimientos.HAPTotal.alto = 0;
      veeva.calculadora.procedimientos.HTECTotal.bajo = 0;
      veeva.calculadora.procedimientos.HTECTotal.intermedio = 0;
      veeva.calculadora.procedimientos.HTECTotal.alto = 0;
      procedimientosHAP.forEach((procedimiento, index) => {
         let calculoBajo = procedimiento.bajo * procedimiento.costoUnitario;
         let calculoIntermedio = procedimiento.intermedio * procedimiento.costoUnitario;
         let calculoAlto = procedimiento.alto * procedimiento.costoUnitario;
         veeva.calculadora.procedimientos.HAP.push({
            recurso: procedimiento.recurso,
            bajo: calculoBajo,
            intermedio: calculoIntermedio,
            alto: calculoAlto
         });
         veeva.calculadora.procedimientos.HAPTotal.bajo += calculoBajo;
         veeva.calculadora.procedimientos.HAPTotal.intermedio += calculoIntermedio;
         veeva.calculadora.procedimientos.HAPTotal.alto += calculoAlto;
      });
      veeva.calculadora.procedimientos.HAPTotalSlider.bajo = veeva.calculadora.procedimientos.HAPTotal.bajo;
      veeva.calculadora.procedimientos.HAPTotalSlider.intermedio = veeva.calculadora.procedimientos.HAPTotal.intermedio;
      veeva.calculadora.procedimientos.HAPTotalSlider.alto = veeva.calculadora.procedimientos.HAPTotal.alto;
      procedimientosHTEC.forEach((procedimiento, index) => {
         let calculoBajo = procedimiento.bajo * procedimiento.costoUnitario;
         let calculoIntermedio = procedimiento.intermedio * procedimiento.costoUnitario;
         let calculoAlto = procedimiento.alto * procedimiento.costoUnitario;
         veeva.calculadora.procedimientos.HTEC.push({
            recurso: procedimiento.recurso,
            bajo: calculoBajo,
            intermedio: calculoIntermedio,
            alto: calculoAlto
         });
         veeva.calculadora.procedimientos.HTECTotal.bajo += calculoBajo;
         veeva.calculadora.procedimientos.HTECTotal.intermedio += calculoIntermedio;
         veeva.calculadora.procedimientos.HTECTotal.alto += calculoAlto;
      });
      veeva.calculadora.procedimientos.HTECTotalSlider.bajo = veeva.calculadora.procedimientos.HTECTotal.bajo;
      veeva.calculadora.procedimientos.HTECTotalSlider.intermedio = veeva.calculadora.procedimientos.HTECTotal.intermedio;
      veeva.calculadora.procedimientos.HTECTotalSlider.alto = veeva.calculadora.procedimientos.HTECTotal.alto ;
      const { totales, HAPTotal, HTECTotal } = veeva.calculadora.procedimientos;
      const { HTEC, HAP } = veeva.calculadora.grupos
      totales.bajo = Math.round(((HAPTotal.bajo * HAP) + (HTECTotal.bajo * HTEC)) / 100);
      totales.intermedio = Math.round(((HAPTotal.intermedio * HAP) + (HTECTotal.intermedio * HTEC)) / 100);
      totales.alto = Math.round(((HAPTotal.alto * HAP) + (HTECTotal.alto * HTEC)) / 100);
      totales.promedio = parseFloat(((totales.bajo + totales.intermedio + totales.alto) / 3).toFixed(2));
      veeva.calculadora.chartOptions.chartProcedures.valores = [totales.bajo, totales.intermedio, totales.alto];
      slideDiez.drawTable(veeva.calculadora.procedimientos.HAP, tableHAP);
      const totalHAPBajo = document.querySelector("input[name='total-HAP-bajo']");
      const totalHAPIntermedio = document.querySelector("input[name='total-HAP-intermedio']");
      const totalHAPAlto = document.querySelector("input[name='total-HAP-alto']");
      totalHAPBajo.value = FORMAT_ENTERO(HAPTotal.bajo).format();
      totalHAPIntermedio.value = FORMAT_ENTERO(HAPTotal.intermedio).format();
      totalHAPAlto.value = FORMAT_ENTERO(HAPTotal.alto).format();
   },

   drawTable: function (procedimientos, tabla) {
      const FORMAT_ENTERO = value => currency(value, { precision: 4, symbol: '', decimal: ',', separator: '.' });
      let procedimientosHTML = '';
      procedimientos.forEach((procedimiento, i) => {
         procedimientosHTML += `
            <tr>
               <td>${procedimiento.recurso}</td>
               <td><custom-input name="HAP-${i}-bajo" type="calc" valor="${FORMAT_ENTERO(procedimiento.bajo).format()}" icon="money"></custom-input></td>
               <td><custom-input name="HAP-${i}-intermedio" type="calc" valor="${FORMAT_ENTERO(parseInt(procedimiento.intermedio)).format()}" icon="money"></custom-input></td>
               <td><custom-input name="HAP-${i}-alto" type="calc" valor="${FORMAT_ENTERO(parseInt(procedimiento.alto)).format()}" icon="money"></custom-input></td>
            </tr>`;
      });
      tabla.innerHTML = procedimientosHTML;
   },

   validarForm: function () {
      localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
      slideDiez.jumpToSlide('11');
   },
   updateTotales: function (value, index) {
      const totalHAPBajo = document.querySelector("input[name='total-HAP-bajo']");
      const totalHAPIntermedio = document.querySelector("input[name='total-HAP-intermedio']");
      const totalHAPAlto = document.querySelector("input[name='total-HAP-alto']");
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });
      let { HAPTotal, HAPTotalSlider } = veeva.calculadora.procedimientos;
      HAPTotal.bajo = HAPTotalSlider.bajo;
      HAPTotal.intermedio = HAPTotalSlider.intermedio;
      HAPTotal.alto = HAPTotalSlider.alto;
      if(index !== 5){veeva.calculadora.procedimientos.indexSlider = index}
      if (value.money !== '0') {
         const selectedPrice = value;
         const operation = selectedPrice.money.charAt(0);
         const amount = parseInt(selectedPrice.money.slice(1).replace('K', '000'));
         if (operation === '+') {
            HAPTotal.bajo += amount;
            HAPTotal.intermedio += amount;
            HAPTotal.alto += amount;
         } else if (operation === '-') {
            HAPTotal.bajo -= amount;
            HAPTotal.intermedio -= amount;
            HAPTotal.alto -= amount;
         }
      }
      totalHAPBajo.value = FORMAT_ENTERO(HAPTotal.bajo).format();
      totalHAPIntermedio.value = FORMAT_ENTERO(HAPTotal.intermedio).format();
      totalHAPAlto.value = FORMAT_ENTERO(HAPTotal.alto).format();
   },

   popUp: function (pop) {
      const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
      if (customPop) {
         customPop.classList.remove('hidden', 'pop-animate-down');
         customPop.classList.add('flex', 'pop-animate-up');
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   popDown: function (pop) {
      const customPop = document.querySelector(`custom-pop[type="${pop}"]`);
      if (customPop) {
         customPop.classList.remove('flex', 'pop-animate-up');
         customPop.classList.add('pop-animate-down');
         setTimeout(() => {
            customPop.classList.add('hidden')
         }, 600);
      } else {
         console.error(`No se encontró ningún elemento <custom-pop> con type="${pop}".`);
      }
   },

   openAlert: function (alert) {
      const customAlert = document.querySelector(`custom-alert[name="alert-${alert}"]`);
      const customAlertConten = document.querySelector(`custom-alert[name="alert-${alert}"] .alert-conten`);
      const customAlertAlert = document.querySelector(`custom-alert[name="alert-${alert}"] .alert`);
      switch (alert) {

         case 'ref-microcosteo':
            if (customAlert) {
               customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
               customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
               customAlert.classList.replace('hidden', 'block');
            } else {
               console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
            }
         break;

         case 'reset':
            if (customAlert) {
               customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
               customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
               customAlert.classList.replace('hidden', 'block');
            } else {
               console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
            }
         break;

         case 'bd-clear':
            if (customAlert) {
               customAlertConten.classList.replace('alert-animate-out', 'alert-animate-in');
               customAlertAlert.classList.replace('alert-conten-animate-out', 'alert-conten-animate-in');
               customAlert.classList.replace('hidden', 'block');
            } else {
               console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
            }
         break;
      }
   },

   closeAlert: function () {
      const customAlert = document.querySelector('custom-alert.block');
      const customAlertConten = document.querySelector('custom-alert.block .alert-conten');
      const customAlertAlert = document.querySelector('custom-alert.block .alert-conten .alert');
      if (customAlert) {
         customAlertConten.classList.replace('alert-animate-in', 'alert-animate-out');
         customAlertAlert.classList.replace('alert-conten-animate-in', 'alert-conten-animate-out');
         setTimeout(() => {
            customAlert.classList.replace('block', 'hidden');
         }, 600);
      } else {
         console.error(`No se encontró ningún elemento <custom-alert> con name="alert-${pop}".`);
      }
   },

   loadConfig: function () {
      return fetch('js/config.json').then(response => response.json()).then(data => {
         veeva = data;
      }).catch(error => {
         console.error('Error al cargar la configuración:', error);
      });
   },

   jumpToSlide: function (slide) {
      localStorage.setItem('previousSlide', veeva.slide);
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
   }
};

document.addEventListener('DOMContentLoaded', function () {
   slideDiez.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideDiez.ini();
      setTimeout(() => {
         slideDiez.calcCostProcedimientos();
      }, 1000);
   });
});