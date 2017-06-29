function textoMapa(idCalor){
    switch(idCalor){
            
        case "Caracteristicas1oficial":
            $("#desplegadaExplicacion").html("<p>Esta variable hace referencia al total de la matrícula.  De acuerdo a la ley 115 de 1994, también conocida como ley general de educación, “La matrícula es el acto que formaliza la vinculación del educando al servicio educativo. Se realizará por una sola vez, al ingresar el alumno a un establecimiento educativo, pudiéndose establecer renovaciones para cada periodo académico” (artículo 95).  El acto de matrícula en educación formal implica la inserción en un sistema educativo que conduce al educando por un conjunto de ciclos lectivos, con sujeción a pautas progresivas, condiciona su permanencia al cumplimiento de determinados requisitos y es conducente a grados y títulos.</p>")
            break;
            
        case "Caracteristicas1nooficial":
            $("#desplegadaExplicacion").html("<p>Esta variable hace referencia al total de la matrícula.  De acuerdo a la ley 115 de 1994, también conocida como ley general de educación “La matrícula es el acto que formaliza la vinculación del educando al servicio educativo. Se realizará por una sola vez, al ingresar el alumno a un establecimiento educativo, pudiéndose establecer renovaciones para cada periodo académico” (artículo 95).  El acto de matrícula en educación formal implica la inserción en un sistema educativo que conduce al educando por un conjunto de ciclos lectivos, con sujeción a pautas progresivas, condiciona su permanencia al cumplimiento de determinados requisitos y es conducente a grados y títulos.</p>")
            break;
        case "Caracteristicas2oficial":
             $("#desplegadaExplicacion").html("<p>La ley general de educación -115 de 1994- define tres niveles de la educación formal: preescolar, básica –primaria y secundaria- y media, los cuales se organizan por grados secuenciales. El preescolar comprende mínimo un grado obligatorio; la educación básica comprende 9 grados, 5 en primaria y 4 en secundaria; mientras que la educación media comprende dos grados.</p>");
            break;
        case "Caracteristicas2nooficial":
             $("#desplegadaExplicacion").html("<p>La ley general de educación -115 de 1994- define tres niveles de la educación formal: preescolar, básica –primaria y secundaria- y media, los cuales se organizan por grados secuenciales. El preescolar comprende mínimo un grado obligatorio; la educación básica comprende 9 grados, 5 en primaria y 4 en secundaria; mientras que la educación media comprende dos grados.</p>");
            break; 
        case "Caracteristicas3oficial":
             $("#desplegadaExplicacion").html("<p>  La educación primaria hace parte de la formación básica. De acuerdo a la ley 115 la educación básica busca propiciar una formación general en las áreas fundamentales del conocimiento y la actividad humana, de manera crítica y creativa. Así mismo, busca desarrollar habilidades comunicativas, fortalecer el razonamiento lógico y analítico, propiciar el conocimiento y la comprensión de la realidad nacional, fomentar actitudes hacia la práctica investigativa y propiciar una formación en valores. La educación básica primaria se compone de los grados 1 a 5, que deben ser cursados –en lo posible- entre los 6 y los 10 años. </p>");
            break; 
        
        case "Caracteristicas3nooficial":
             $("#desplegadaExplicacion").html("<p>La educación primaria hace parte de la formación básica. De acuerdo a la ley 115 la educación básica busca propiciar una formación general en las áreas fundamentales del conocimiento y la actividad humana, de manera crítica y creativa. Así mismo, busca desarrollar habilidades comunicativas, fortalecer el razonamiento lógico y analítico, propiciar el conocimiento y la comprensión de la realidad nacional, fomentar actitudes hacia la práctica investigativa y propiciar una formación en valores. La educación básica primaria se compone de los grados 1 a 5, que deben ser cursados –en lo posible- entre los 6 y los 10 años. </p>");
            break; 
        case "Caracteristicas4oficial":
             $("#desplegadaExplicacion").html("<p>De acuerdo a la ley 115 la educación básica busca propiciar una formación general en las áreas fundamentales del conocimiento y la actividad humana, de manera crítica y creativa. Así mismo, busca desarrollar habilidades comunicativas, fortalecer el razonamiento lógico y analítico, propiciar el conocimiento y la comprensión de la realidad nacional, fomentar actitudes hacia la práctica investigativa y propiciar una formación en valores. Dentro de la educación básica secundaria se cursan los grados 6 a 9, de manera idónea deben ser cursados entre los 11 y los 14 años.  </p>");
            break;
        
         case "Caracteristicas4nooficial":
             $("#desplegadaExplicacion").html("<p>De acuerdo a la ley 115 la educación básica busca propiciar una formación general en las áreas fundamentales del conocimiento y la actividad humana, de manera crítica y creativa. Así mismo, busca desarrollar habilidades comunicativas, fortalecer el razonamiento lógico y analítico, propiciar el conocimiento y la comprensión de la realidad nacional, fomentar actitudes hacia la práctica investigativa y propiciar una formación en valores. Dentro de la educación básica secundaria se cursan los grados 6 a 9, de manera idónea deben ser cursados entre los 11 y los 14 años.   </p>");
            break;
        
        case "Caracteristicas5oficial":
             $("#desplegadaExplicacion").html("<p>De acuerdo a la Ley 115, la educación media es la consolidación y avance en el logro de los niveles anteriores, tiene como finalidad la comprensión de ideas y valores universales y la preparación para el ingreso de los educandos a la educación superior.  Puede ser de carácter académico o técnico, comprende dos grados: 10 y 11, que de manera ideal deben ser cursados a los 15 y 16 años.</p>");
            break;     
            
        case "Caracteristicas5nooficial":
             $("#desplegadaExplicacion").html("<p>De acuerdo a la Ley 115, la educación media es la consolidación y avance en el logro de los niveles anteriores, tiene como finalidad la comprensión de ideas y valores universales y la preparación para el ingreso de los educandos a la educación superior.  Puede ser de carácter académico o técnico, comprende dos grados: 10 y 11, que de manera ideal deben ser cursados a los 15 y 16 años. </p>");
            break;    
            
      
        default: 
            $("#desplegadaExplicacion").html("");
    }
}

