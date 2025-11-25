<b><sup>Auditoria 1</sup></b>

![](Aspose.Words.3ed0db19-5519-444b-b45e-4352eb9ea143.001.png)


**Los 5 Errores Críticos Identificados:**

1. **Uso de variables var:** Se detectó un sobreuso de var para declarar variables (ej. var buffer, var memoria), lo cual es una práctica obsoleta en JavaScript moderno.
1. **Uso de parseInt global:** El código utilizaba la función global parseInt(buffer), lo cual no es recomendado en estándares modernos.
1. **Uso de isNaN global:** Se usaba isNaN() para validaciones, lo cual puede generar resultados inesperados al no ser estricto con el tipo de dato.
1. **Uso de parseFloat global:** Similar al punto anterior, se usaba la función global en lugar del método del constructor Number.
1. **Problemas de Accesibilidad (CSS):** El archivo CSS presentaba problemas de contraste entre el texto y el fondo (ej. texto blanco sobre fondo naranja #f39c12), dificultando la lectura.

