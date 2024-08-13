"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By:
 */
let veeva = {};

let slideOcho = {
   validateCounnt: 0,

   ini: async function () {
      const calculadoraData = localStorage.getItem('calculadora');
      if (calculadoraData) {
         veeva.calculadora = await JSON.parse(calculadoraData);
         document.dispatchEvent(new Event('configLoaded'));
      } else {
         setTimeout(() => {
            slideOcho.openAlert('bd-clear');
         }, 1400);
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
      slide === '02' ? localStorage.setItem('instrucciones', true) : localStorage.removeItem('instrucciones');
      if (typeof veeva !== 'undefined' && veeva.gotoSlide) {
         document.location = `veeva:gotoSlide(${veeva.zipName}${slide}.zip,${veeva.presentationCode})`;
      } else {
         document.location = `/public/${veeva.zipName}${slide}/${veeva.zipName}${slide}.html`;
      }
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

   formatToFloatString: function(value) {
      let floatValue = parseFloat(value).toFixed(2);
      return floatValue.replace('.', ',');
   },

   updateInputComplications: function () {
      const costos = veeva.calculadora.complicaciones.costos;

      const totalCostoBajo = document.querySelector("input[name='total-bajo']");
      const totalCostoIntermedio = document.querySelector("input[name='total-intermedio']");
      const totalCostoAlto = document.querySelector("input[name='total-alto']");

      const costoOneBajo = document.querySelector("input[name='costo-1-bajo']");
      const costoOneIntermedio = document.querySelector("input[name='costo-1-intermedio']");
      const costoOneAlto = document.querySelector("input[name='costo-1-alto']");

      const costoTwoBajo = document.querySelector("input[name='costo-2-bajo']");
      const costoTwoIntermedio = document.querySelector("input[name='costo-2-intermedio']");
      const costoTwoAlto = document.querySelector("input[name='costo-2-alto']");

      const costoThreeBajo = document.querySelector("input[name='costo-3-bajo']");
      const costoThreeIntermedio = document.querySelector("input[name='costo-3-intermedio']");
      const costoThreeAlto = document.querySelector("input[name='costo-3-alto']");

      costoOneBajo.value = slideOcho.formatToFloatString(costos[0].bajo)
      costoOneIntermedio.value = slideOcho.formatToFloatString(costos[0].intermedio)
      costoOneAlto.value = slideOcho.formatToFloatString(costos[0].alto)

      costoTwoBajo.value = slideOcho.formatToFloatString(costos[1].bajo)
      costoTwoIntermedio.value = slideOcho.formatToFloatString(costos[1].intermedio)
      costoTwoAlto.value = slideOcho.formatToFloatString(costos[1].alto)

      costoThreeBajo.value = slideOcho.formatToFloatString(costos[2].bajo)
      costoThreeIntermedio.value = slideOcho.formatToFloatString(costos[2].intermedio)
      costoThreeAlto.value = slideOcho.formatToFloatString(costos[2].alto)

      totalCostoBajo.value = slideOcho.formatToFloatString(costos[3].bajo)
      totalCostoIntermedio.value = slideOcho.formatToFloatString(costos[3].intermedio)
      totalCostoAlto.value = slideOcho.formatToFloatString(costos[3].alto)

      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideOcho.validateTecnnology();
            slideOcho.closeAlert();
         }, 400);
      }
   },

   syncComplicationsWithReference: function () {
      const probabilidades = veeva.calculadora.complicaciones.probabilidades
      const referencias = veeva.calculadora.referencias.complicaciones.probabilidades;

      referencias.forEach((refProbabilidades, index) => {

         probabilidades[index].bajo = referencias[index].bajo;
         probabilidades[index].intermedio += referencias[index].intermedio;
         probabilidades[index].alto += referencias[index].alto;
      });

      console.log("Complicaciones actualizadas:", probabilidades);
      slideOcho.actualizarInputs()
   },

   actualizarInputs: function() {
      slideOcho.updateInputComplications();
      const customAlert = document.querySelector('custom-alert.block');
      if (customAlert) {
         setTimeout(() => {
            slideOcho.validateComplications();
            slideOcho.closeAlert();
         }, 400);
      }
   },

   validateComplications: function () {
      slideOcho.validateCounnt++;
      const getValues = (names) => {
         return names.map(name => {
            const input = document.querySelector(`input[name="${name}"]`);
            return {
               value: parseFloat(input.value.replace(',', '.')),
               parentTd: input.closest('td')
            };
         });
      };

      const inputs = [
         ...getValues(['complicacion-1-bajo', 'complicacion-1-intermedio', 'complicacion-1-alto']),
         ...getValues(['complicacion-2-bajo', 'complicacion-2-intermedio', 'complicacion-2-alto']),
         ...getValues(['complicacion-3-bajo', 'complicacion-3-intermedio', 'complicacion-3-alto'])
      ];

      inputs.forEach(({ value, parentTd }) => {
         if (value === 0) {
            parentTd.classList.add('input-error');
         } else {
            parentTd.classList.remove('input-error');
         }
      });

      const validate = inputs.every(({ value }) => value !== 0);
      return validate;
   },

   validarForm: function() {
      const validateComplications = slideOcho.validateComplications();
      const title = document.querySelector('header hgroup div h3');
      const complicaciones = document.querySelector('.complicaciones');
      const costos = document.querySelector('.costos');
      console.log('validacion exitosa', validateComplications);
      if (validateComplications === true) {
         title.innerHTML = "Costo complicaciones por paciente";
         complicaciones.classList.replace('flex', 'hidden');
         costos.classList.replace('hidden', 'flex');
      }

      // localStorage.setItem('calculadora', JSON.stringify(veeva.calculadora));
      // slideOcho.jumpToSlide('08');
   }
};


document.addEventListener('DOMContentLoaded', function () {
   slideOcho.loadConfig().then(() => {
      console.log(`LoadConfig Ready Slide ${veeva.zipName}${veeva.slide}`);
      slideOcho.ini();
      setTimeout(() => {
         slideOcho.updateInputComplications();
      }, 1000);
   });
});