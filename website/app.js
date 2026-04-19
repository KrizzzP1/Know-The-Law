// ── UI string translations ────────────────────────────────────────────────────

const UI = {
  en: {
    homeBtn:        'Home',
    amendmentsLabel:'Amendments',
    backBtn:        '← Back',
    homeNavBtn:     '⌂ Home',
    continueBtn:    'Continue →',
    tryAnother:     '← Try another path',
    startOver:      'Start over',
    rightsHeader:   { info: 'Your Rights', warning: 'Your Rights — Proceed with Caution', critical: 'Critical — Know Your Rights Now' },
    rightsSubheader:'Rights you can assert',
    adviceHeader:   'What to say',
    txHeader:       'Texas Law',
    eyebrow:        'U.S. Bill of Rights',
    heading:        'Know Your <span>Rights</span>',
    sub:            'Select an amendment to navigate your constitutional rights step by step.',
    disclaimer:     'For educational purposes only. Not legal advice.',
    langToggle:     'Español',
    amendmentTag:   n => `${n} Amendment`,
  },
  es: {
    homeBtn:        'Inicio',
    amendmentsLabel:'Enmiendas',
    backBtn:        '← Atrás',
    homeNavBtn:     '⌂ Inicio',
    continueBtn:    'Continuar →',
    tryAnother:     '← Probar otro camino',
    startOver:      'Empezar de nuevo',
    rightsHeader:   { info: 'Sus Derechos', warning: 'Sus Derechos — Proceda con Cautela', critical: 'Crítico — Conozca Sus Derechos Ahora' },
    rightsSubheader:'Derechos que puede ejercer',
    adviceHeader:   'Qué decir',
    txHeader:       'Ley de Texas',
    eyebrow:        'Declaración de Derechos de EE.UU.',
    heading:        'Conozca Sus <span>Derechos</span>',
    sub:            'Seleccione una enmienda para navegar sus derechos constitucionales paso a paso.',
    disclaimer:     'Solo con fines educativos. No es asesoría legal.',
    langToggle:     'English',
    amendmentTag:   n => { const m = {'4th':'4.ª','5th':'5.ª','6th':'6.ª','8th':'8.ª'}; return `Enmienda ${m[n]||n}`; },
  },
};

// ── Amendment data ────────────────────────────────────────────────────────────

const AMENDMENTS = [
  {
    id: 'fourth', numeral: 'IV',
    title: '4th Amendment',    subtitle: 'Search & Seizure',
    esTitle: '4.ª Enmienda',   esSubtitle: 'Registro y Embargo',
    tree: {
      root: 'start',
      nodes: {
        start: {
          type: 'question', amendment: '4th',
          text: 'What is the situation?',
          options: [
            { label: 'Police want to search my home',                            next: 'home_warrant' },
            { label: 'Police want to search my vehicle',                         next: 'vehicle_stop' },
            { label: 'Police stopped me on the street',                          next: 'street_stop' },
            { label: 'Police want to search my phone/device',                    next: 'phone_search' },
            { label: 'I am at a Border Patrol checkpoint (Falfurrias / Sarita)', next: 'checkpoint_stop' },
          ],
          es: {
            text: '¿Cuál es la situación?',
            options: ['La policía quiere registrar mi casa', 'La policía quiere registrar mi vehículo', 'La policía me detuvo en la calle', 'La policía quiere registrar mi teléfono/dispositivo', 'Estoy en un retén de la Patrulla Fronteriza (Falfurrias / Sarita)'],
          },
        },

        // Home ───────────────────────────────────────────────────────────────
        home_warrant: {
          type: 'question', amendment: '4th',
          text: 'Do the police have a warrant?',
          options: [
            { label: 'Yes, they have a warrant',            next: 'home_warrant_check' },
            { label: 'No warrant',                          next: 'home_no_warrant' },
            { label: "I don't know / they haven't said",    next: 'home_ask_warrant' },
          ],
          es: {
            text: '¿Tiene la policía una orden judicial?',
            options: ['Sí, tienen una orden judicial', 'No tienen orden judicial', 'No sé / no lo han dicho'],
          },
        },
        home_warrant_check: {
          type: 'question', amendment: '4th',
          text: 'Does the warrant specifically name your address?',
          options: [
            { label: 'Yes — my correct address is on it', next: 'home_warrant_valid' },
            { label: 'No, or I cannot verify',            next: 'home_warrant_invalid' },
          ],
          es: {
            text: '¿La orden judicial especifica su dirección?',
            options: ['Sí — mi dirección correcta está en la orden', 'No, o no puedo verificarlo'],
          },
        },
        home_warrant_valid: {
          type: 'conclusion', severity: 'info',
          text: 'A valid warrant authorizes the search. You must allow entry, but the search is limited to areas and items specifically named in the warrant.',
          rights: [
            'Remain silent — do not answer questions beyond basic identification',
            'Ask for a copy of the warrant before officers enter',
            'Observe the search — you may watch but must not interfere',
            'Document officer names, badge numbers, and anything seized',
          ],
          advice: 'Say clearly: "I do not consent to this search." This verbal non-consent preserves your right to challenge the scope of the search in court even when a warrant exists. Do not physically resist. Contact an attorney immediately after.',
          es: {
            text: 'Una orden judicial válida autoriza el registro. Debe permitir la entrada, pero el registro está limitado a las áreas y artículos específicamente mencionados en la orden.',
            rights: ['Guarde silencio — no responda preguntas más allá de su identificación básica', 'Pida una copia de la orden antes de que los oficiales entren', 'Puede observar el registro — puede mirar pero no debe interferir', 'Documente los nombres de los oficiales, números de placa y todo lo confiscado'],
            advice: 'Diga claramente: "No doy mi consentimiento para este registro." Este rechazo verbal preserva su derecho a impugnar el alcance del registro en la corte, incluso cuando existe una orden válida. No resista físicamente. Contacte a un abogado inmediatamente después.',
          },
        },
        home_warrant_invalid: {
          type: 'conclusion', severity: 'warning',
          text: 'A warrant that does not specifically name your address, or is otherwise defective, may render the search unconstitutional under the 4th Amendment.',
          rights: [
            'Calmly state: "I do not believe this warrant covers my address"',
            'Do not physically resist — verbal protest preserves your rights',
            'Note officer names and badge numbers for your attorney',
          ],
          advice: 'Say: "I do not consent to this search. I believe this warrant is invalid for my address." Do not physically resist entry. Contact an attorney immediately — defective warrants can be challenged to suppress any evidence found.',
          es: {
            text: 'Una orden que no especifica su dirección, o que tiene defectos, puede hacer que el registro sea inconstitucional bajo la Cuarta Enmienda.',
            rights: ['Diga calmadamente: "No creo que esta orden cubra mi dirección"', 'No resista físicamente — su protesta verbal preserva sus derechos', 'Anote los nombres de los oficiales y sus números de placa para su abogado'],
            advice: 'Diga: "No doy mi consentimiento para este registro. Creo que esta orden no es válida para mi dirección." No resista físicamente. Contacte a un abogado inmediatamente.',
          },
        },
        home_ask_warrant: {
          type: 'conclusion', severity: 'warning',
          text: 'You have the right to ask whether officers have a warrant before opening your door. You are not required to open your door without one.',
          rights: [
            'Ask through the closed door: "Do you have a warrant?"',
            'You may refuse to open the door if there is no warrant',
            'Verbally state your non-consent if they claim authority to enter',
          ],
          advice: 'Speak through your closed door: "Do you have a warrant?" If the answer is no, say: "I do not consent to a search." You do not have to open the door unless they announce exigent circumstances or produce a warrant.',
          es: {
            text: 'Tiene derecho a preguntar si los oficiales tienen una orden judicial antes de abrir su puerta. No está obligado a abrir la puerta sin una.',
            rights: ['Pregunte a través de la puerta cerrada: "¿Tiene una orden judicial?"', 'Puede negarse a abrir la puerta si no tienen orden judicial', 'Declare verbalmente que no da su consentimiento si reclaman autoridad para entrar'],
            advice: 'Hable a través de su puerta cerrada: "¿Tiene una orden judicial?" Si la respuesta es no, diga: "No doy mi consentimiento para un registro." No tiene que abrir la puerta a menos que anuncien una emergencia o presenten una orden.',
          },
        },
        home_no_warrant: {
          type: 'question', amendment: '4th',
          text: 'Are officers claiming an emergency (exigent circumstances) — such as someone inside is in danger, or hot pursuit of a fleeing suspect?',
          options: [
            { label: 'Yes, they claim an emergency', next: 'home_exigent' },
            { label: 'No emergency claimed',          next: 'home_no_exigent' },
          ],
          es: {
            text: '¿Los oficiales alegan una emergencia (circunstancias urgentes) — como que alguien dentro está en peligro, o persecución de un sospechoso que huye?',
            options: ['Sí, alegan una emergencia', 'No alegan ninguna emergencia'],
          },
        },
        home_exigent: {
          type: 'conclusion', severity: 'warning',
          text: 'Exigent circumstances are a recognized exception to the warrant requirement. Police may enter without a warrant if there is a genuine immediate emergency. The scope of entry must be limited to that emergency.',
          rights: [
            'Do not physically resist entry during a claimed emergency',
            'Verbally state: "I do not consent to any search beyond the emergency"',
            'The validity and scope of exigent circumstances can be challenged in court',
          ],
          advice: 'Say: "I do not consent to a search beyond any emergency." Document what the officers did and said. An attorney can argue that claimed exigent circumstances were fabricated or that the search exceeded their scope.',
          es: {
            text: 'Las circunstancias urgentes son una excepción reconocida al requisito de orden judicial. La policía puede entrar sin orden si hay una emergencia genuina e inmediata. El alcance de la entrada debe limitarse a esa emergencia.',
            rights: ['No resista físicamente la entrada durante una emergencia declarada', 'Declare verbalmente: "No doy mi consentimiento para ningún registro más allá de la emergencia"', 'La validez y alcance de las circunstancias urgentes puede impugnarse en la corte'],
            advice: 'Diga: "No doy mi consentimiento para un registro más allá de la emergencia." Documente lo que los oficiales hicieron y dijeron. Un abogado puede argumentar que las circunstancias urgentes alegadas fueron fabricadas o que el registro excedió su alcance.',
          },
        },
        home_no_exigent: {
          type: 'conclusion', severity: 'critical',
          text: 'Without a warrant or exigent circumstances, police generally cannot enter your home. Your home receives the strongest 4th Amendment protection of any space.',
          rights: [
            'Deny consent clearly: "I do not consent to a search of my home"',
            'You do not have to open the door',
            'You do not have to answer any questions',
          ],
          advice: 'Say through your closed door: "I do not consent to a search. Please leave or get a warrant." If they force entry without a warrant or emergency, do not physically resist — document everything and call an attorney immediately.',
          es: {
            text: 'Sin una orden judicial o circunstancias urgentes, la policía generalmente no puede entrar a su hogar. Su hogar recibe la mayor protección de la Cuarta Enmienda.',
            rights: ['Niegue el consentimiento claramente: "No doy mi consentimiento para un registro de mi hogar"', 'No tiene que abrir la puerta', 'No tiene que responder ninguna pregunta'],
            advice: 'Diga a través de su puerta cerrada: "No doy mi consentimiento para un registro. Por favor retírense o consigan una orden judicial." Si entran a la fuerza sin orden ni emergencia, no resista físicamente — documente todo y llame a un abogado inmediatamente.',
          },
        },

        // Vehicle ────────────────────────────────────────────────────────────
        vehicle_stop: {
          type: 'question', amendment: '4th',
          text: 'What is the context of the vehicle encounter?',
          options: [
            { label: 'Routine traffic stop',                          next: 'vehicle_traffic' },
            { label: 'Officers claim probable cause to search',       next: 'vehicle_probable_cause' },
            { label: 'Officers are asking for my consent to search',  next: 'vehicle_consent' },
          ],
          es: {
            text: '¿Cuál es el contexto del encuentro con el vehículo?',
            options: ['Parada de tráfico rutinaria', 'Los oficiales alegan causa probable para registrar', 'Los oficiales me están pidiendo consentimiento para registrar'],
          },
        },
        vehicle_traffic: {
          type: 'conclusion', severity: 'info',
          text: 'During a routine traffic stop, police may ask you to step out of the vehicle. They may only search if they have probable cause, your consent, or a warrant.',
          rights: [
            'Provide license, registration, and proof of insurance when asked',
            'You may remain silent beyond providing those documents',
            'You may refuse consent to search the vehicle',
            'You may not be detained longer than necessary without reasonable suspicion',
          ],
          advice: 'Be calm and polite. If asked to search, say: "I do not consent to a search." If you want to leave, ask: "Am I free to go?" Do not physically resist any search that happens anyway — challenge it in court.',
          texasNote: 'Texas Transportation Code § 543.001 requires drivers stopped for a traffic violation to provide their name, date of birth, address, and vehicle registration on demand. Refusal is a Class B misdemeanor — a legal obligation that goes beyond the federal baseline. Texas officers may arrest you for failing to identify.',
          es: {
            text: 'Durante una parada de tráfico rutinaria, la policía puede pedirle que salga del vehículo. Solo pueden registrarlo si tienen causa probable, su consentimiento, o una orden judicial.',
            rights: ['Proporcione licencia de conducir, registro y prueba de seguro cuando se lo pidan', 'Puede guardar silencio más allá de proporcionar esos documentos', 'Puede negarse a dar consentimiento para registrar el vehículo', 'No pueden detenerle más tiempo del necesario para la parada sin sospecha razonable'],
            advice: 'Sea calmado y cortés. Si le piden registrar, diga: "No doy mi consentimiento para un registro." Si quiere irse, pregunte: "¿Puedo retirarme?" No resista físicamente ningún registro — impúgnelo en la corte.',
            texasNote: 'El Código de Transporte de Texas § 543.001 exige que los conductores detenidos por una infracción de tráfico proporcionen su nombre, fecha de nacimiento, dirección y registro del vehículo. Negarse es un delito menor Clase B — una obligación legal. Los oficiales de Texas pueden arrestarle por no identificarse.',
          },
        },
        vehicle_probable_cause: {
          type: 'conclusion', severity: 'warning',
          text: 'Under the automobile exception, police may search a vehicle without a warrant if they have probable cause to believe it contains evidence of a crime. Whether probable cause actually existed is a question for a court.',
          rights: [
            'Verbally state: "I do not consent to this search"',
            'Do not physically resist',
            'You may remain silent',
            'Ask clearly: "Am I being detained or am I free to go?"',
          ],
          advice: 'Say: "I do not consent to this search." This verbal non-consent preserves your right to argue in court that probable cause did not exist. Document everything and contact an attorney.',
          es: {
            text: 'Bajo la excepción del automóvil, la policía puede registrar un vehículo sin orden judicial si tiene causa probable para creer que contiene evidencia de un delito. Si realmente existía la causa probable es una pregunta para la corte.',
            rights: ['Declare verbalmente: "No doy mi consentimiento para este registro"', 'No resista físicamente', 'Puede guardar silencio', 'Pregunte claramente: "¿Estoy detenido o puedo retirarme?"'],
            advice: 'Diga: "No doy mi consentimiento para este registro." Este rechazo verbal preserva su derecho a argumentar en la corte que no existía causa probable. Documente todo y contacte a un abogado.',
          },
        },
        vehicle_consent: {
          type: 'conclusion', severity: 'critical',
          text: 'You have the right to refuse consent to search your vehicle. Giving consent waives your 4th Amendment protections for that search. Refusing consent alone cannot be used as probable cause.',
          rights: [
            'You may refuse: say "I do not consent to a search of my vehicle"',
            'Refusal is not grounds for arrest or detention on its own',
            'You cannot be punished solely for refusing consent',
          ],
          advice: 'Say clearly: "I do not consent to a search of my vehicle." If they search anyway, do not resist. Document everything and contact an attorney — a warrantless, non-consensual search may be unlawful.',
          es: {
            text: 'Tiene derecho a negarse a dar consentimiento para registrar su vehículo. Dar consentimiento renuncia a sus protecciones de la Cuarta Enmienda. Negarse al consentimiento por sí solo no puede usarse como causa probable.',
            rights: ['Puede negarse: diga "No doy mi consentimiento para un registro de mi vehículo"', 'La negativa no es motivo de arresto o detención por sí sola', 'No puede ser castigado únicamente por negarse a dar consentimiento'],
            advice: 'Diga claramente: "No doy mi consentimiento para un registro de mi vehículo." Si registran de todos modos, no resista. Documente todo y contacte a un abogado — un registro sin orden ni consentimiento puede ser ilegal.',
          },
        },

        // Street ─────────────────────────────────────────────────────────────
        street_stop: {
          type: 'question', amendment: '4th',
          text: 'What is the officer doing?',
          options: [
            { label: 'Approaching or asking me questions (consensual)', next: 'street_encounter' },
            { label: 'Telling me to stop / I cannot leave (detention)', next: 'street_detained' },
            { label: 'Frisking or patting down my outer clothing',      next: 'street_frisk' },
          ],
          es: {
            text: '¿Qué está haciendo el oficial?',
            options: ['Acercándose o haciéndome preguntas (voluntario)', 'Diciéndome que me detenga / no puedo irme (detención)', 'Cacheándome o palpando mi ropa exterior'],
          },
        },
        street_encounter: {
          type: 'conclusion', severity: 'info',
          text: 'A consensual police encounter is not a detention. You are free to leave if no one has told you to stop or stay.',
          rights: [
            'You may walk away from a consensual encounter',
            'You are generally not required to answer questions',
            'Ask clearly: "Am I free to go?"',
          ],
          advice: 'Calmly ask: "Am I free to go?" If the officer says yes, you may leave. If the officer says no or is evasive, you are likely being detained — state: "I am invoking my right to remain silent."',
          es: {
            text: 'Un encuentro policial voluntario no es una detención. Puede retirarse si nadie le ha dicho que se detenga o quede.',
            rights: ['Puede alejarse de un encuentro voluntario', 'Generalmente no está obligado a responder preguntas', 'Pregunte claramente: "¿Puedo retirarme?"'],
            advice: 'Pregunte calmadamente: "¿Puedo retirarme?" Si el oficial dice sí, puede irse. Si dice no o evade la respuesta, probablemente está siendo detenido — diga: "Estoy ejerciendo mi derecho a guardar silencio."',
          },
        },
        street_detained: {
          type: 'conclusion', severity: 'warning',
          text: 'Police may briefly detain you (a Terry stop) only if they have reasonable articulable suspicion — specific facts — that you are involved in criminal activity. A hunch or your appearance alone is not enough.',
          rights: [
            'Ask: "Am I being detained or am I free to go?"',
            'You do not have to answer questions (stop-and-identify laws vary by state)',
            'Detention must be brief and limited to investigating the specific suspicion',
          ],
          advice: 'Stay calm. Ask: "Am I being detained or am I free to go?" If detained, state: "I am invoking my right to remain silent." Do not physically resist — an unlawful detention can be challenged in court.',
          texasNote: 'Texas Penal Code § 38.02 (Stop and Identify) requires you to provide your name, date of birth, and residence address when lawfully detained. Refusal is a Class C misdemeanor; providing false information is a Class B misdemeanor. This applies during a lawful detention — not a voluntary encounter.',
          es: {
            text: 'La policía solo puede detenerle brevemente (una parada de tipo Terry) si tiene sospecha razonable y articulable — hechos específicos — de que está involucrado en actividad criminal. Una corazonada o su apariencia sola no es suficiente.',
            rights: ['Pregunte: "¿Estoy detenido o puedo retirarme?"', 'No tiene que responder preguntas (las leyes de identificación varían por estado)', 'La detención debe ser breve y limitada a investigar la sospecha específica'],
            advice: 'Mantenga la calma. Pregunte: "¿Estoy detenido o puedo retirarme?" Si está detenido, diga: "Estoy ejerciendo mi derecho a guardar silencio." No resista físicamente — una detención ilegal puede impugnarse en la corte.',
            texasNote: 'El Código Penal de Texas § 38.02 exige que proporcione su nombre, fecha de nacimiento y dirección de residencia cuando está legalmente detenido. Negarse es un delito menor Clase C; dar información falsa es Clase B. Esto aplica durante una detención legal — no durante un encuentro voluntario.',
          },
        },
        street_frisk: {
          type: 'conclusion', severity: 'warning',
          text: 'Police may pat down your outer clothing only if they have reasonable suspicion that you are armed and dangerous. This is a limited search for weapons, not a full search for contraband.',
          rights: [
            'Verbally state: "I do not consent to a search"',
            'A frisk is limited to outer clothing for weapons only',
            'Officers may not reach into pockets without additional justification',
          ],
          advice: 'Say: "I do not consent to this search." Do not physically resist. If anything is found during an unlawful frisk, it may be suppressed in court — document everything and consult an attorney.',
          es: {
            text: 'La policía solo puede palpar su ropa exterior si tiene sospecha razonable de que está armado y es peligroso. Es un registro limitado para buscar armas, no una búsqueda completa.',
            rights: ['Declare verbalmente: "No doy mi consentimiento para un registro"', 'Un cacheo está limitado a la ropa exterior para buscar armas', 'Los oficiales no pueden meter las manos en sus bolsillos sin justificación adicional'],
            advice: 'Diga: "No doy mi consentimiento para este registro." No resista físicamente. Si encuentran algo durante un cacheo ilegal, puede ser excluido en la corte — documente todo y consulte a un abogado.',
          },
        },

        // Border Patrol Checkpoints (RGV-specific) ───────────────────────────
        checkpoint_stop: {
          type: 'question', amendment: '4th',
          text: 'RGV Interior Checkpoints — Falfurrias (US-281) and Sarita (US-77) are fixed interior checkpoints operated by Border Patrol, not border crossings. The 4th Amendment applies differently here than at a standard traffic stop. What is happening?',
          options: [
            { label: 'I was stopped at the primary lane and asked about citizenship',     next: 'checkpoint_primary' },
            { label: 'I was directed to secondary inspection',                            next: 'checkpoint_secondary' },
            { label: 'Agents want to search my vehicle or trunk',                         next: 'checkpoint_search' },
          ],
          es: {
            text: 'Retenes Interiores del RGV — Falfurrias (US-281) y Sarita (US-77) son retenes fijos operados por la Patrulla Fronteriza, no cruces fronterizos. La Cuarta Enmienda aplica de manera diferente aquí que en una parada de tráfico estándar. ¿Qué está ocurriendo?',
            options: ['Me detuvieron en el carril principal y me preguntaron sobre mi ciudadanía', 'Me enviaron a la inspección secundaria', 'Los agentes quieren registrar mi vehículo o maletero'],
          },
        },
        checkpoint_primary: {
          type: 'conclusion', severity: 'info',
          text: 'Under United States v. Martinez-Fuerte (1976), Border Patrol may operate fixed interior checkpoints and briefly stop all vehicles to ask about citizenship or immigration status — without any individualized suspicion. This is a recognized "administrative search" exception to the 4th Amendment warrant requirement. However, it is narrow: the stop must be brief, and agents cannot search your vehicle based solely on this checkpoint stop.',
          rights: [
            'Agents may lawfully ask about citizenship or immigration status — you should answer this question',
            'Beyond citizenship questions, you are not required to answer further questions',
            'Agents may NOT search your vehicle or open your trunk without probable cause or your consent',
            'You may not be detained indefinitely at primary for refusing unrelated questions',
            'You have the right to remain silent on anything beyond your citizenship status',
          ],
          advice: 'Answer the citizenship question calmly. For anything beyond that, you may say: "I am not answering further questions." Do not open your trunk or glove box voluntarily. If asked to pull to secondary, comply — but clearly state: "I do not consent to any search."',
          texasNote: 'The Falfurrias checkpoint (US-281, Brooks County) and the Sarita checkpoint (US-77, Kenedy County) are the two primary inland checkpoints in the RGV corridor. They are approximately 70 miles from the border. Courts have upheld their operation under Martinez-Fuerte but have also ruled that prolonged detentions at primary without reasonable suspicion violate the 4th Amendment.',
          es: {
            text: 'Bajo United States v. Martinez-Fuerte (1976), la Patrulla Fronteriza puede operar retenes interiores fijos y detener brevemente todos los vehículos para preguntar sobre ciudadanía o estatus migratorio — sin sospecha individualizada. Es una excepción de "búsqueda administrativa" reconocida a la Cuarta Enmienda. Sin embargo, es limitada: la parada debe ser breve y los agentes no pueden registrar su vehículo basándose solo en esta parada.',
            rights: ['Los agentes pueden legalmente preguntar sobre ciudadanía o estatus migratorio — debe responder esta pregunta', 'Más allá de preguntas sobre ciudadanía, no está obligado a responder otras preguntas', 'Los agentes NO pueden registrar su vehículo o abrir su maletero sin causa probable o su consentimiento', 'No puede ser detenido indefinidamente en el control primario por negarse a responder preguntas no relacionadas', 'Tiene derecho a guardar silencio sobre cualquier cosa más allá de su estatus de ciudadanía'],
            advice: 'Responda la pregunta sobre ciudadanía con calma. Para cualquier otra pregunta, puede decir: "No voy a responder más preguntas." No abra su maletero ni su guantera voluntariamente. Si le piden ir al control secundario, cumpla — pero diga claramente: "No doy mi consentimiento para ningún registro."',
            texasNote: 'El retén de Falfurrias (US-281, Condado de Brooks) y el retén de Sarita (US-77, Condado de Kenedy) son los dos principales retenes interiores en el corredor del RGV. Están aproximadamente a 70 millas de la frontera. Los tribunales han respaldado su operación bajo Martinez-Fuerte pero también han dictaminado que las detenciones prolongadas en el control primario sin sospecha razonable violan la Cuarta Enmienda.',
          },
        },
        checkpoint_secondary: {
          type: 'conclusion', severity: 'warning',
          text: 'Being directed to secondary inspection does not mean you are under arrest. Agents may conduct a more thorough investigation, but your 4th Amendment rights against unreasonable searches remain in full. Secondary is not a blank check — agents still need probable cause or your consent to search your vehicle or trunk.',
          rights: [
            'Being sent to secondary is not an arrest — you retain all constitutional protections',
            'Agents may ask questions and observe your vehicle exterior, but may NOT search it without probable cause or consent',
            'A dog sniff around the exterior of your vehicle is generally permitted without your consent under current law',
            'If a certified dog alerts, that may establish probable cause for a full search',
            'Refusing consent to search does not by itself provide probable cause',
            'Ask clearly: "Am I free to go?" if the investigation expands beyond a brief stop',
          ],
          advice: 'Do not consent to any search. Say clearly: "I do not consent to a search of my vehicle or trunk." Stay calm and polite. If agents search despite your refusal, do not physically resist — note every agent\'s name and badge number, document what happened and when, and contact an attorney immediately. An illegal checkpoint search can result in evidence being suppressed.',
          texasNote: 'At the Falfurrias and Sarita checkpoints, secondary inspections are common and can last longer than primary stops. Border Patrol uses vehicle scans, dog teams, and questioning at secondary. If your vehicle is searched without probable cause or consent, this may be challengeable under the 4th Amendment. Texas RioGrande Legal Aid (trla.org) handles civil rights cases involving checkpoint searches.',
          es: {
            text: 'Ser enviado a la inspección secundaria no significa que está arrestado. Los agentes pueden realizar una investigación más detallada, pero sus derechos de la Cuarta Enmienda contra registros irrazonables permanecen completamente vigentes. El control secundario no es autorización para registrar su vehículo — los agentes aún necesitan causa probable o su consentimiento.',
            rights: ['Ser enviado al secundario no es un arresto — conserva todas sus protecciones constitucionales', 'Los agentes pueden hacer preguntas y observar el exterior de su vehículo, pero NO pueden registrarlo sin causa probable o consentimiento', 'Un olfateo de perro alrededor del exterior de su vehículo generalmente está permitido sin su consentimiento bajo la ley actual', 'Si un perro certificado alerta, eso puede establecer causa probable para un registro completo', 'Negarse al consentimiento para registrar no proporciona causa probable por sí solo', 'Pregunte claramente: "¿Puedo retirarme?" si la investigación se expande más allá de una parada breve'],
            advice: 'No dé consentimiento para ningún registro. Diga claramente: "No doy mi consentimiento para un registro de mi vehículo o maletero." Mantenga la calma y sea cortés. Si los agentes registran a pesar de su negativa, no resista físicamente — anote el nombre y número de placa de cada agente, documente lo que ocurrió y cuándo, y contacte a un abogado inmediatamente.',
            texasNote: 'En los retenes de Falfurrias y Sarita, las inspecciones secundarias son comunes y pueden durar más que las paradas primarias. La Patrulla Fronteriza usa escáneres de vehículos, equipos de perros y cuestionamiento en el secundario. Si se registra su vehículo sin causa probable o consentimiento, esto puede ser impugnable bajo la Cuarta Enmienda. Texas RioGrande Legal Aid (trla.org) maneja casos de derechos civiles relacionados con registros en retenes.',
          },
        },
        checkpoint_search: {
          type: 'question', amendment: '4th',
          text: 'On what basis are agents attempting to search your vehicle at the checkpoint?',
          options: [
            { label: 'They are asking for my consent to search',              next: 'checkpoint_consent' },
            { label: 'They claim probable cause or there was a dog alert',    next: 'checkpoint_pc' },
          ],
          es: {
            text: '¿Con qué base intentan los agentes registrar su vehículo en el retén?',
            options: ['Me están pidiendo mi consentimiento para registrar', 'Alegan causa probable o hubo una alerta de perro'],
          },
        },
        checkpoint_consent: {
          type: 'conclusion', severity: 'critical',
          text: 'You have the right to refuse consent to search your vehicle at a Border Patrol checkpoint. Agents frequently ask for consent precisely because they do not have probable cause. Consenting waives your 4th Amendment protections entirely for that search — even at a checkpoint.',
          rights: [
            'You may clearly refuse: "I do not consent to a search of my vehicle or trunk"',
            'Refusing consent at a checkpoint cannot, by itself, justify a prolonged detention',
            'Refusal cannot be used as probable cause to justify a warrantless search',
            'If agents search anyway, it may be an illegal search challengeable in court',
            'You do not have to open your trunk, doors, or any compartment voluntarily',
          ],
          advice: 'Say firmly and calmly: "I do not consent to a search of my vehicle or trunk." Repeat it clearly if asked again. If agents search despite your refusal, do not physically resist — note every agent\'s name and badge number, and contact a civil rights attorney immediately. Evidence from an illegal consent-less search can be suppressed.',
          texasNote: 'Consent searches are extremely common at the Falfurrias and Sarita checkpoints. Studies show Border Patrol asks for consent when they lack probable cause. Your refusal is your strongest legal protection. Texas RioGrande Legal Aid (trla.org) and the ACLU of Texas (aclutx.org) can assist if your rights are violated at a checkpoint.',
          es: {
            text: 'Tiene derecho a negarse al consentimiento para registrar su vehículo en un retén de la Patrulla Fronteriza. Los agentes frecuentemente piden consentimiento precisamente porque no tienen causa probable. Dar consentimiento renuncia completamente a sus protecciones de la Cuarta Enmienda — incluso en un retén.',
            rights: ['Puede negarse claramente: "No doy mi consentimiento para un registro de mi vehículo o maletero"', 'Negarse al consentimiento en un retén no puede, por sí solo, justificar una detención prolongada', 'La negativa no puede usarse como causa probable para justificar un registro sin orden', 'Si los agentes registran de todos modos, puede ser un registro ilegal impugnable en la corte', 'No tiene que abrir su maletero, puertas ni ningún compartimento voluntariamente'],
            advice: 'Diga firmemente y con calma: "No doy mi consentimiento para un registro de mi vehículo o maletero." Repítalo claramente si le vuelven a preguntar. Si los agentes registran a pesar de su negativa, no resista físicamente — anote el nombre y número de placa de cada agente y contacte a un abogado de derechos civiles inmediatamente.',
            texasNote: 'Los registros con consentimiento son extremadamente comunes en los retenes de Falfurrias y Sarita. Estudios muestran que la Patrulla Fronteriza pide consentimiento cuando no tiene causa probable. Su negativa es su mayor protección legal. Texas RioGrande Legal Aid (trla.org) y la ACLU de Texas (aclutx.org) pueden ayudar si se violan sus derechos en un retén.',
          },
        },
        checkpoint_pc: {
          type: 'conclusion', severity: 'warning',
          text: 'If agents have probable cause — which can include a certified dog alert — they may search your vehicle at a checkpoint without a warrant under the automobile exception. However, probable cause must be genuine, specific, and articulable. A dog alert can be challenged in court if the dog was not properly certified or the alert was ambiguous.',
          rights: [
            'Verbally state "I do not consent to this search" even if agents proceed — this preserves your rights',
            'A dog sniff of the vehicle exterior is not a "search" under current law and does not require consent',
            'A positive dog alert can establish probable cause — but the dog must be certified and results documented',
            'The search must be limited in scope to areas where contraband could reasonably be found',
            'You may challenge whether probable cause was genuine in a motion to suppress evidence',
          ],
          advice: 'Say clearly: "I do not consent to this search." Do not physically resist. Ask for and document the agent\'s name, badge number, and the dog\'s certification number if a dog was used. Your attorney can challenge whether the dog was properly certified, whether the alert was actually a positive indication, and whether the search exceeded its lawful scope.',
          texasNote: 'At RGV checkpoints, Border Patrol routinely deploys dog teams. A dog alert — even on an empty vehicle — has been used to justify full searches. Courts have ruled that an unreliable or improperly handled dog does not establish probable cause. Ask your attorney to subpoena the dog\'s certification and alert records. Contact Texas RioGrande Legal Aid (trla.org) for assistance.',
          es: {
            text: 'Si los agentes tienen causa probable — que puede incluir una alerta de perro certificado — pueden registrar su vehículo en un retén sin orden judicial bajo la excepción del automóvil. Sin embargo, la causa probable debe ser genuina, específica y articulable. Una alerta de perro puede ser impugnada si el perro no estaba debidamente certificado o si la alerta fue ambigua.',
            rights: ['Declare verbalmente "No doy mi consentimiento para este registro" incluso si los agentes proceden — esto preserva sus derechos', 'Un olfateo de perro del exterior del vehículo no es un "registro" bajo la ley actual y no requiere consentimiento', 'Una alerta positiva de perro puede establecer causa probable — pero el perro debe estar certificado y los resultados documentados', 'El registro debe limitarse en alcance a las áreas donde razonablemente podría encontrarse contrabando', 'Puede impugnar si la causa probable fue genuina en una moción para suprimir evidencia'],
            advice: 'Diga claramente: "No doy mi consentimiento para este registro." No resista físicamente. Solicite y documente el nombre, número de placa del agente y el número de certificación del perro si se usó uno. Su abogado puede impugnar si el perro estaba debidamente certificado, si la alerta fue genuinamente una indicación positiva, y si el registro excedió su alcance legal.',
            texasNote: 'En los retenes del RGV, la Patrulla Fronteriza rutinariamente despliega equipos de perros. Una alerta de perro — incluso en un vehículo vacío — se ha usado para justificar registros completos. Los tribunales han dictaminado que un perro poco confiable o mal manejado no establece causa probable. Pídale a su abogado que cite los registros de certificación y alerta del perro. Contacte a Texas RioGrande Legal Aid (trla.org) para asistencia.',
          },
        },

        // Phone ──────────────────────────────────────────────────────────────
        phone_search: {
          type: 'conclusion', severity: 'critical',
          text: 'Under Riley v. California (2014), police generally need a warrant to search your phone, even incident to a lawful arrest. Your digital privacy receives strong 4th Amendment protection.',
          rights: [
            'You may refuse to hand over or unlock your phone without a warrant',
            'You are not required to provide a password or biometric to unlock',
            'This protection applies even if you are under arrest',
          ],
          advice: 'Say: "I do not consent to a search of my phone. You need a warrant." Do not unlock your device. If arrested, police may seize the device but cannot search it without a warrant. Contact an attorney immediately.',
          es: {
            text: 'Bajo Riley v. California (2014), la policía generalmente necesita una orden judicial para registrar su teléfono, incluso cuando le arrestan. Su privacidad digital recibe una fuerte protección de la Cuarta Enmienda.',
            rights: ['Puede negarse a entregar o desbloquear su teléfono sin una orden judicial', 'No está obligado a proporcionar una contraseña o huella digital para desbloquearlo', 'Esta protección aplica incluso si está bajo arresto'],
            advice: 'Diga: "No doy mi consentimiento para un registro de mi teléfono. Necesitan una orden judicial." No desbloquee su dispositivo. Si le arrestan, la policía puede confiscar el dispositivo pero no puede registrarlo sin orden. Contacte a un abogado inmediatamente.',
          },
        },
      },
    },
  },

  // ── 5th Amendment ───────────────────────────────────────────────────────────
  {
    id: 'fifth', numeral: 'V',
    title: '5th Amendment',   subtitle: 'Right to Remain Silent',
    esTitle: '5.ª Enmienda',  esSubtitle: 'Derecho a Guardar Silencio',
    tree: {
      root: 'start',
      nodes: {
        start: {
          type: 'question', amendment: '5th',
          text: 'What is the situation?',
          options: [
            { label: 'Police are questioning me',                          next: 'questioning' },
            { label: 'I have been arrested',                               next: 'arrested' },
            { label: 'I am being asked to testify or provide a statement', next: 'testify' },
            { label: 'Police want a physical sample or my device password',next: 'compelled_evidence' },
          ],
          es: {
            text: '¿Cuál es la situación?',
            options: ['La policía me está interrogando', 'He sido arrestado', 'Me están pidiendo que testifique o proporcione una declaración', 'La policía quiere una muestra física o la contraseña de mi dispositivo'],
          },
        },
        questioning: {
          type: 'question', amendment: '5th',
          text: 'Are you currently in police custody — arrested, or not free to leave?',
          options: [
            { label: 'Yes, I am in custody or under arrest', next: 'in_custody' },
            { label: 'No, I believe I am free to leave',     next: 'not_in_custody' },
            { label: "I don't know",                         next: 'determine_custody' },
          ],
          es: {
            text: '¿Está actualmente bajo custodia policial — arrestado, o sin libertad para irse?',
            options: ['Sí, estoy bajo custodia o arrestado', 'No, creo que puedo retirarme', 'No sé'],
          },
        },
        determine_custody: {
          type: 'conclusion', severity: 'info',
          text: 'Your custody status determines which protections apply. Ask the officer directly: "Am I free to go?" The answer determines your status.',
          rights: [
            'If free to go — you are not in custody and may leave',
            'If not free to go — you are effectively in custody',
            'Your right to silence applies in both situations',
            'Miranda warnings are only required for custodial interrogation',
          ],
          advice: 'Ask the officer: "Am I free to go?" If yes, leave. If no, say: "I am invoking my right to remain silent. I would like an attorney." Then stay completely silent.',
          es: {
            text: 'Su estado de custodia determina qué protecciones aplican. Pregúntele directamente al oficial: "¿Puedo retirarme?" La respuesta determina su situación.',
            rights: ['Si puede retirarse — no está bajo custodia y puede irse', 'Si no puede retirarse — está efectivamente bajo custodia', 'Su derecho al silencio aplica en ambas situaciones', 'Los avisos Miranda solo son requeridos durante interrogatorio bajo custodia'],
            advice: 'Pregúntele al oficial: "¿Puedo retirarme?" Si dice sí, retírese. Si dice no, diga: "Estoy ejerciendo mi derecho a guardar silencio. Quiero un abogado." Luego guarde silencio completamente.',
          },
        },
        not_in_custody: {
          type: 'conclusion', severity: 'warning',
          text: 'You are not in custody. You have no legal obligation to answer police questions in most circumstances. Anything you say voluntarily can still be used against you.',
          rights: [
            'You may refuse to answer questions',
            'You may walk away from a consensual encounter',
            'You generally cannot be arrested solely for refusing to answer questions',
          ],
          advice: 'You can say politely: "I prefer not to answer questions without an attorney present." You are not required to explain your refusal. If unsure, ask: "Am I free to go?" — and leave if allowed.',
          texasNote: 'In Texas, even during a non-custodial lawful detention, Penal Code § 38.02 requires you to identify yourself (name, DOB, address). However, you are still not required to answer substantive questions about a crime. The identification obligation does not waive your broader right to silence.',
          es: {
            text: 'No está bajo custodia. En la mayoría de las circunstancias, no tiene obligación legal de responder preguntas de la policía. Cualquier cosa que diga voluntariamente aún puede usarse en su contra.',
            rights: ['Puede negarse a responder preguntas', 'Puede alejarse de un encuentro voluntario', 'Generalmente no pueden arrestarle únicamente por negarse a responder preguntas'],
            advice: 'Puede decir cortésmente: "Prefiero no responder preguntas sin un abogado presente." No está obligado a explicar su negativa. Si no está seguro, pregunte: "¿Puedo retirarme?" — y retírese si le permiten.',
            texasNote: 'En Texas, incluso durante una detención legal sin arresto, el § 38.02 del Código Penal le exige que se identifique (nombre, fecha de nacimiento, dirección). Sin embargo, no está obligado a responder preguntas sobre un delito. La obligación de identificarse no renuncia a su derecho más amplio de guardar silencio.',
          },
        },
        in_custody: {
          type: 'question', amendment: '5th',
          text: 'Were you read your Miranda rights? ("You have the right to remain silent...")',
          options: [
            { label: 'Yes, I was read Miranda rights',    next: 'miranda_read' },
            { label: 'No, I was not read Miranda rights', next: 'miranda_not_read' },
          ],
          es: {
            text: '¿Le leyeron sus derechos Miranda? ("Tiene el derecho de guardar silencio...")',
            options: ['Sí, me leyeron los derechos Miranda', 'No, no me leyeron los derechos Miranda'],
          },
        },
        miranda_read: {
          type: 'conclusion', severity: 'critical',
          text: 'You have been explicitly informed of your rights. You are in custody and anything you say can and will be used against you in court.',
          rights: [
            'Right to remain silent — exercise it completely',
            'Right to an attorney before and during any questioning',
            'Right to a court-appointed attorney if you cannot afford one',
            'You may stop answering questions at any time, even if you already started',
          ],
          advice: 'Say clearly and unambiguously: "I am invoking my right to remain silent. I want an attorney." Then say absolutely nothing else. Do not try to explain, justify, or talk your way out — silence is your strongest protection.',
          es: {
            text: 'Le han informado explícitamente de sus derechos. Está bajo custodia y cualquier cosa que diga puede y será usada en su contra en la corte.',
            rights: ['Derecho a guardar silencio — ejerza ese derecho completamente', 'Derecho a un abogado antes y durante cualquier interrogatorio', 'Derecho a un abogado nombrado por la corte si no puede pagar uno', 'Puede dejar de responder preguntas en cualquier momento, incluso si ya comenzó'],
            advice: 'Diga clara e inequívocamente: "Estoy ejerciendo mi derecho a guardar silencio. Quiero un abogado." Luego no diga absolutamente nada más. No trate de explicarse — el silencio es su mayor protección.',
          },
        },
        miranda_not_read: {
          type: 'conclusion', severity: 'critical',
          text: 'If you are in custody and subject to interrogation, Miranda warnings are constitutionally required. Failure to give them can make your statements inadmissible — but your right to remain silent exists regardless.',
          rights: [
            'Your right to silence exists whether or not Miranda was read',
            'Statements taken in custody without Miranda warnings may be suppressed',
            'You may invoke your rights at any point in the process',
          ],
          advice: 'Say: "I am invoking my right to remain silent and my right to an attorney." Document that no Miranda warning was given — this is critical for your attorney. Stay silent.',
          es: {
            text: 'Si está bajo custodia y sujeto a interrogatorio, los avisos Miranda son constitucionalmente obligatorios. No darlos puede hacer sus declaraciones inadmisibles — pero su derecho a guardar silencio existe independientemente.',
            rights: ['Su derecho al silencio existe hayan o no leído los avisos Miranda', 'Las declaraciones tomadas bajo custodia sin avisos Miranda pueden ser excluidas', 'Puede ejercer sus derechos en cualquier punto del proceso'],
            advice: 'Diga: "Estoy ejerciendo mi derecho a guardar silencio y mi derecho a un abogado." Documente que no le dieron el aviso Miranda — esto es crítico para su abogado. Guarde silencio.',
          },
        },
        arrested: {
          type: 'conclusion', severity: 'critical',
          text: 'Upon arrest, your 5th Amendment rights are fully in effect. You are not required to answer any questions beyond basic booking information.',
          rights: [
            'Right to remain silent — beyond your name and basic identification (varies by state)',
            'Right to an attorney before answering any substantive questions',
            'Right to have an attorney present during any interrogation',
            'Anything you say can be used against you',
          ],
          advice: 'Say immediately: "I am invoking my right to remain silent. I want an attorney." Repeat this if questioned again. Do not attempt to talk your way out of an arrest — it almost never helps and frequently causes serious harm.',
          es: {
            text: 'Tras el arresto, sus derechos de la Quinta Enmienda están completamente en vigor. No está obligado a responder ninguna pregunta más allá de la información básica de identificación.',
            rights: ['Derecho a guardar silencio — más allá de su nombre e identificación básica (varía por estado)', 'Derecho a un abogado antes de responder preguntas sustantivas', 'Derecho a tener un abogado presente durante cualquier interrogatorio', 'Cualquier cosa que diga puede ser usada en su contra'],
            advice: 'Diga inmediatamente: "Estoy ejerciendo mi derecho a guardar silencio. Quiero un abogado." Repita esto si le vuelven a interrogar. No trate de hablar para salir del arresto — casi nunca ayuda y frecuentemente causa daño grave.',
          },
        },
        testify: {
          type: 'question', amendment: '5th',
          text: 'In what context are you being asked to testify or provide information?',
          options: [
            { label: 'I am the suspect or defendant in a criminal case', next: 'testify_defendant' },
            { label: 'I am a witness (not the person accused)',           next: 'testify_witness' },
            { label: 'I received a grand jury subpoena',                 next: 'testify_grand_jury' },
          ],
          es: {
            text: '¿En qué contexto le están pidiendo que testifique o proporcione información?',
            options: ['Soy el sospechoso o acusado en un caso criminal', 'Soy testigo (no la persona acusada)', 'Recibí una citación del gran jurado'],
          },
        },
        testify_defendant: {
          type: 'conclusion', severity: 'info',
          text: 'As a criminal defendant, you have an absolute constitutional right not to testify. The prosecution cannot comment on your silence, and the jury may not infer guilt from it.',
          rights: [
            'You cannot be compelled to testify against yourself',
            'Prosecutors may not mention your silence to the jury as evidence of guilt',
            'This is one of the most absolute protections in the Bill of Rights',
          ],
          advice: 'Consult your attorney before making any decision about testifying. Your silence cannot legally be used against you.',
          es: {
            text: 'Como acusado en un caso criminal, tiene un derecho constitucional absoluto de no testificar. La fiscalía no puede comentar sobre su silencio, y el jurado no puede inferir culpabilidad de él.',
            rights: ['No puede ser obligado a testificar en su contra', 'Los fiscales no pueden mencionar su silencio al jurado como evidencia de culpabilidad', 'Esta es una de las protecciones más absolutas de la Declaración de Derechos'],
            advice: 'Consulte a su abogado antes de tomar cualquier decisión sobre testificar. Su silencio legalmente no puede ser usado en su contra.',
          },
        },
        testify_witness: {
          type: 'conclusion', severity: 'warning',
          text: 'As a witness, you may invoke the 5th Amendment only for questions where your specific answer might incriminate you personally. You cannot refuse to testify entirely unless all testimony could incriminate you.',
          rights: [
            'You may refuse to answer specific questions that could incriminate you personally',
            'You cannot refuse to appear or answer questions that only incriminate others',
            'If granted immunity, you lose the right to refuse those questions',
          ],
          advice: 'Consult an attorney before testifying as a witness. Identify which specific questions could incriminate you and invoke the 5th Amendment on those questions only.',
          es: {
            text: 'Como testigo, puede invocar la Quinta Enmienda solo para preguntas donde su respuesta específica podría incriminarle personalmente. No puede negarse a testificar completamente a menos que todo su testimonio pudiera incriminarle.',
            rights: ['Puede negarse a responder preguntas específicas que podrían incriminarle personalmente', 'No puede negarse a comparecer ni a responder preguntas que solo incriminan a otros', 'Si se le otorga inmunidad, pierde el derecho a negarse a esas preguntas'],
            advice: 'Consulte a un abogado antes de testificar como testigo. Identifique qué preguntas específicas podrían incriminarle e invoque la Quinta Enmienda solo en esas preguntas.',
          },
        },
        testify_grand_jury: {
          type: 'conclusion', severity: 'warning',
          text: 'Grand jury subpoenas are powerful. You generally must appear when subpoenaed, but you may invoke the 5th Amendment on any individual question whose answer might incriminate you.',
          rights: [
            'You must appear if properly subpoenaed — you may not simply refuse to show up',
            'You may invoke the 5th on any incriminating question',
            'You have the right to consult with your attorney outside the room before answering',
          ],
          advice: 'You must appear, but for any incriminating question say: "On advice of counsel, I invoke my Fifth Amendment privilege against self-incrimination." You must consult an attorney before appearing — this is critical.',
          es: {
            text: 'Las citaciones del gran jurado son poderosas. Generalmente debe comparecer cuando es citado, pero puede invocar la Quinta Enmienda en cualquier pregunta individual cuya respuesta pudiera incriminarle.',
            rights: ['Debe comparecer si es debidamente citado — no puede simplemente negarse a aparecer', 'Puede invocar la Quinta en cualquier pregunta incriminatoria', 'Tiene derecho a consultar con su abogado fuera de la sala antes de responder'],
            advice: 'Debe comparecer, pero para cualquier pregunta incriminatoria diga: "Por consejo de mi abogado, invoco mi derecho de la Quinta Enmienda contra la auto-incriminación." Debe consultar a un abogado antes de comparecer — esto es crítico.',
          },
        },
        compelled_evidence: {
          type: 'question', amendment: '5th',
          text: 'What type of evidence is being requested?',
          options: [
            { label: 'Verbal testimony or written statements',   next: 'compelled_testimony' },
            { label: 'Blood draw, DNA swab, or physical sample', next: 'compelled_physical' },
            { label: 'Phone password or device unlock',          next: 'compelled_password' },
          ],
          es: {
            text: '¿Qué tipo de evidencia se está solicitando?',
            options: ['Testimonio verbal o declaraciones escritas', 'Extracción de sangre, muestra de ADN o muestra física', 'Contraseña del teléfono o desbloqueo del dispositivo'],
          },
        },
        compelled_testimony: {
          type: 'conclusion', severity: 'info',
          text: 'The 5th Amendment protects against compelled testimonial self-incrimination. You cannot be forced to make verbal or written statements that incriminate you.',
          rights: [
            'You cannot be forced to make any verbal or written incriminating statement',
            'This applies to police questioning, depositions, court proceedings, and grand juries',
          ],
          advice: 'Invoke your rights explicitly: "I invoke my Fifth Amendment right against self-incrimination." Then consult an attorney before saying anything further.',
          es: {
            text: 'La Quinta Enmienda protege contra la auto-incriminación testimonial forzada. No puede ser obligado a hacer declaraciones verbales o escritas que le incriminen.',
            rights: ['No puede ser obligado a hacer ninguna declaración verbal o escrita incriminatoria', 'Esto aplica a interrogatorios policiales, deposiciones, procesos judiciales y gran jurado'],
            advice: 'Invoque sus derechos explícitamente: "Invoco mi derecho de la Quinta Enmienda contra la auto-incriminación." Luego consulte a un abogado antes de decir algo más.',
          },
        },
        compelled_physical: {
          type: 'conclusion', severity: 'warning',
          text: 'Physical evidence such as blood draws and DNA swabs is generally not protected by the 5th Amendment because it is not "testimonial." Courts have upheld compelled physical samples. Your protection here comes primarily from the 4th Amendment.',
          rights: [
            'The 4th Amendment requires a warrant or recognized exception for most physical samples',
            'You may object and ask whether a warrant exists',
            'Do not physically resist — state your objection verbally',
          ],
          advice: 'State: "I do not consent to this." Ask: "Do you have a warrant?" Do not physically resist. Your 4th Amendment rights — not the 5th — are the primary protection here. Consult an attorney about the specific circumstances.',
          texasNote: 'Texas implied consent law (Transportation Code § 724.011) deems any person operating a vehicle on public roads to have consented to a breath or blood test upon arrest for DWI. Refusal triggers an automatic license suspension: 180 days for a first refusal, 2 years if you have a prior DWI or refusal. An officer may also seek a blood draw warrant.',
          es: {
            text: 'La evidencia física como extracciones de sangre y muestras de ADN generalmente no está protegida por la Quinta Enmienda porque no se considera "testimonial". Los tribunales han respaldado muestras físicas forzadas. Su protección aquí proviene principalmente de la Cuarta Enmienda.',
            rights: ['La Cuarta Enmienda requiere una orden judicial o excepción reconocida para la mayoría de las muestras físicas', 'Puede objetar y preguntar si existe una orden judicial', 'No resista físicamente — exprese su objeción verbalmente'],
            advice: 'Diga: "No doy mi consentimiento para esto." Pregunte: "¿Tiene una orden judicial?" No resista físicamente. Sus derechos de la Cuarta Enmienda — no la Quinta — son la protección principal aquí. Consulte a un abogado.',
            texasNote: 'La ley de consentimiento implícito de Texas (Código de Transporte § 724.011) considera que cualquier conductor en vías públicas ha consentido a una prueba de aliento o sangre al ser arrestado por DWI. Negarse resulta en suspensión automática de la licencia: 180 días para el primer rechazo, 2 años con antecedentes previos. Un oficial también puede solicitar una orden judicial para extracción de sangre.',
          },
        },
        compelled_password: {
          type: 'conclusion', severity: 'critical',
          text: 'This is an evolving area of law. Courts are divided. Compelling a memorized password is more likely protected under the 5th Amendment (a testimonial act) than compelling a fingerprint to unlock a device (treated as a physical act). Your jurisdiction matters significantly.',
          rights: [
            'Compelling a memorized password may be protected as a testimonial act',
            'Compelling a biometric (fingerprint/face) is generally afforded less 5th Amendment protection',
            'You may refuse and assert your 5th Amendment privilege',
          ],
          advice: 'Say: "I invoke my Fifth Amendment right and do not consent to providing my password." Do not unlock your device. This area of law is actively being litigated — consult an attorney immediately.',
          es: {
            text: 'Esta es un área del derecho en evolución. Los tribunales están divididos. Obligar a proporcionar una contraseña memorizada probablemente está más protegido por la Quinta Enmienda (acto testimonial) que obligar a usar una huella digital (tratado como acto físico). Su jurisdicción importa significativamente.',
            rights: ['Obligar una contraseña memorizada puede estar protegido como acto testimonial', 'Obligar datos biométricos (huella/cara) generalmente recibe menos protección de la Quinta Enmienda', 'Puede negarse e invocar su privilegio de la Quinta Enmienda'],
            advice: 'Diga: "Invoco mi derecho de la Quinta Enmienda y no doy mi consentimiento para proporcionar mi contraseña." No desbloquee su dispositivo. Esta área del derecho está siendo activamente litigada — consulte a un abogado inmediatamente.',
          },
        },
      },
    },
  },

  // ── 6th Amendment ───────────────────────────────────────────────────────────
  {
    id: 'sixth', numeral: 'VI',
    title: '6th Amendment',   subtitle: 'Right to Counsel',
    esTitle: '6.ª Enmienda',  esSubtitle: 'Derecho a un Abogado',
    tree: {
      root: 'start',
      nodes: {
        start: {
          type: 'question', amendment: '6th',
          text: 'What is the situation?',
          options: [
            { label: 'I have been arrested and want an attorney',         next: 'arrested_counsel' },
            { label: 'Police are questioning me and I want an attorney',  next: 'interrogation_counsel' },
            { label: 'I cannot afford an attorney',                       next: 'cannot_afford' },
            { label: 'I was denied an attorney at a critical stage',      next: 'absent_counsel' },
            { label: 'I want to know my right to be informed of charges', next: 'know_charges' },
            { label: 'I want to know about my right to a speedy trial',   next: 'speedy_trial' },
          ],
          es: {
            text: '¿Cuál es la situación?',
            options: ['He sido arrestado y quiero un abogado', 'La policía me está interrogando y quiero un abogado', 'No puedo pagar un abogado', 'Me negaron un abogado en una etapa crítica', 'Quiero saber mi derecho a ser informado de los cargos', 'Quiero saber sobre mi derecho a un juicio rápido'],
          },
        },
        arrested_counsel: {
          type: 'conclusion', severity: 'critical',
          text: 'Upon arrest, you have the right to an attorney. This right attaches at the initiation of formal criminal proceedings — arrest, arraignment, indictment, or first appearance — whichever comes first.',
          rights: [
            'Right to an attorney at all critical stages of prosecution',
            'Right to consult privately with your attorney before questioning',
            'Right to a court-appointed attorney (public defender) if you cannot afford one',
            'Right to an attorney of your own choosing (if you can afford one)',
          ],
          advice: 'Say immediately and clearly: "I want an attorney." Police must stop all questioning once you invoke this right. Do not answer any questions until your attorney is present. If questioning continues, repeat: "I want an attorney and I am not answering questions."',
          es: {
            text: 'Tras el arresto, tiene derecho a un abogado. Este derecho surge al inicio de los procedimientos criminales formales — arresto, presentación ante el juez, acusación formal, o primera comparecencia — lo que ocurra primero.',
            rights: ['Derecho a un abogado en todas las etapas críticas del proceso', 'Derecho a consultar privadamente con su abogado antes del interrogatorio', 'Derecho a un defensor público si no puede pagar un abogado', 'Derecho a un abogado de su elección (si puede pagarlo)'],
            advice: 'Diga inmediata y claramente: "Quiero un abogado." La policía debe detener todo interrogatorio una vez que invoca este derecho. No responda ninguna pregunta hasta que su abogado esté presente. Si continúan interrogándole, repita: "Quiero un abogado y no responderé preguntas."',
          },
        },
        interrogation_counsel: {
          type: 'question', amendment: '6th',
          text: 'Have you already asked for an attorney during this encounter?',
          options: [
            { label: 'Yes, I already asked for an attorney', next: 'already_invoked' },
            { label: 'No, I have not asked yet',             next: 'invoke_now' },
          ],
          es: {
            text: '¿Ya ha pedido un abogado durante este encuentro?',
            options: ['Sí, ya pedí un abogado', 'No, todavía no he pedido uno'],
          },
        },
        already_invoked: {
          type: 'conclusion', severity: 'critical',
          text: 'Once you have invoked your right to an attorney, all questioning must stop immediately. Any statements obtained after that point without an attorney present may be inadmissible.',
          rights: [
            'All interrogation must cease the moment you request an attorney',
            'Police may not resume questioning unless your attorney is present or you re-initiate contact',
            'Statements taken in violation of this right may be suppressed at trial',
          ],
          advice: 'If questioning continues after you already invoked, stay completely silent. You may repeat: "I have already asked for an attorney. I will not answer questions without one present." Document that questioning continued after your request.',
          es: {
            text: 'Una vez que ha invocado su derecho a un abogado, todo interrogatorio debe detenerse inmediatamente. Cualquier declaración obtenida después de ese momento sin un abogado presente puede ser inadmisible.',
            rights: ['Todo interrogatorio debe cesar en el momento en que pide un abogado', 'La policía no puede reanudar el interrogatorio a menos que su abogado esté presente o usted retome el contacto', 'Las declaraciones tomadas en violación de este derecho pueden ser excluidas en el juicio'],
            advice: 'Si el interrogatorio continúa después de que ya lo invocó, guarde silencio completamente. Puede repetir: "Ya pedí un abogado. No responderé preguntas sin uno presente." Documente que el interrogatorio continuó después de su solicitud.',
          },
        },
        invoke_now: {
          type: 'conclusion', severity: 'critical',
          text: 'You can invoke your right to an attorney at any moment during questioning. The invocation must be clear and unambiguous. Prior answers do not waive your right to stop and demand counsel.',
          rights: [
            'You may demand an attorney at any point during questioning',
            'Questioning must stop immediately upon a clear, unambiguous request',
            'Answering earlier questions does not forfeit your right to stop now',
          ],
          advice: 'Say right now: "I want an attorney. I will not answer any questions without an attorney present." Then stay completely silent. Do not answer "just one more question" — your right is absolute once clearly invoked.',
          es: {
            text: 'Puede invocar su derecho a un abogado en cualquier momento durante el interrogatorio. La invocación debe ser clara e inequívoca. Respuestas anteriores no renuncian a su derecho de detenerse ahora y exigir un abogado.',
            rights: ['Puede exigir un abogado en cualquier punto durante el interrogatorio', 'El interrogatorio debe detenerse inmediatamente ante una solicitud clara e inequívoca', 'Haber respondido preguntas anteriores no le hace perder su derecho de detenerse ahora'],
            advice: 'Diga ahora mismo: "Quiero un abogado. No responderé ninguna pregunta sin un abogado presente." Luego guarde silencio completamente. No responda "solo una pregunta más" — su derecho es absoluto una vez claramente invocado.',
          },
        },
        cannot_afford: {
          type: 'conclusion', severity: 'info',
          text: 'Under Gideon v. Wainwright (1963), if you face potential imprisonment and cannot afford an attorney, the state must provide one at no cost to you. This is an absolute right.',
          rights: [
            'Right to a court-appointed attorney (public defender) in any case where imprisonment is possible',
            'Right to this appointment before your trial begins',
            'Right to effective assistance of counsel — an incompetent defense is a constitutional violation',
          ],
          advice: 'At your arraignment or first court appearance, tell the judge: "I cannot afford an attorney and I am requesting a court-appointed attorney." Do not attempt to represent yourself — exercise this right at your first opportunity.',
          es: {
            text: 'Bajo Gideon v. Wainwright (1963), si enfrenta posible prisión y no puede pagar un abogado, el estado debe proporcionarle uno sin costo. Este es un derecho absoluto.',
            rights: ['Derecho a un defensor público en cualquier caso donde sea posible la prisión', 'Derecho a esta designación antes de que comience su juicio', 'Derecho a asistencia legal efectiva — una defensa incompetente es una violación constitucional'],
            advice: 'En su presentación ante el juez, dígale al juez: "No puedo pagar un abogado y solicito que se me nombre un defensor público." No trate de representarse a sí mismo — ejerza este derecho en su primera oportunidad.',
          },
        },
        absent_counsel: {
          type: 'conclusion', severity: 'warning',
          text: 'The 6th Amendment guarantees the right to counsel at all "critical stages" of prosecution: arraignment, preliminary hearings, plea negotiations, trial, and sentencing. Evidence or statements obtained without counsel at a critical stage may be challengeable.',
          rights: [
            'Right to attorney at arraignment, bail hearings, preliminary hearings, plea bargaining, trial, and sentencing',
            'Evidence or admissions obtained at critical stages without counsel may be suppressed',
            'Constitutionally ineffective assistance of counsel is grounds for appeal or a new trial',
          ],
          advice: 'Document precisely when and where you were denied counsel and at which stage of proceedings. Raise this immediately with your attorney — evidence obtained at critical stages without counsel present may be suppressed or reversed.',
          es: {
            text: 'La Sexta Enmienda garantiza el derecho a un abogado en todas las "etapas críticas" del proceso: presentación ante el juez, audiencias preliminares, negociaciones de acuerdo, juicio y sentencia. La evidencia obtenida sin abogado en una etapa crítica puede ser impugnable.',
            rights: ['Derecho a abogado en presentación ante el juez, audiencias de fianza, audiencias preliminares, negociaciones de acuerdo, juicio y sentencia', 'Evidencia o admisiones obtenidas en etapas críticas sin abogado pueden ser excluidas', 'Asistencia legal constitucionalmente ineficaz es motivo de apelación o nuevo juicio'],
            advice: 'Documente con precisión cuándo y dónde le negaron la asistencia legal y en qué etapa del proceso. Informe esto inmediatamente a su abogado — evidencia obtenida en etapas críticas sin abogado presente puede ser excluida o revertida.',
          },
        },
        know_charges: {
          type: 'conclusion', severity: 'info',
          text: 'The 6th Amendment guarantees your right to be informed of the nature and cause of the accusations against you. You must receive specific, written notice of every charge.',
          rights: [
            'Right to be told specifically which crime you are charged with',
            'Right to receive written notice of all charges',
            'Right to know the charges before you are required to enter a plea',
            'Vague or overbroad charges can be challenged',
          ],
          advice: 'At your arraignment, if the charges are unclear, tell your attorney or state to the judge: "I have not been informed of the specific charges against me." This is a foundational right that must be protected from the outset.',
          es: {
            text: 'La Sexta Enmienda garantiza su derecho a ser informado de la naturaleza y causa de los cargos en su contra. Debe recibir aviso específico y escrito de cada cargo.',
            rights: ['Derecho a que le digan específicamente qué delito se le imputa', 'Derecho a recibir aviso escrito de todos los cargos', 'Derecho a conocer los cargos antes de que se le requiera declararse culpable o inocente', 'Los cargos vagos o excesivamente amplios pueden ser impugnados'],
            advice: 'En su presentación ante el juez, si los cargos no están claros, dígale a su abogado o al juez: "No he sido informado de los cargos específicos en mi contra." Este es un derecho fundamental que debe protegerse desde el principio.',
          },
        },
        speedy_trial: {
          type: 'conclusion', severity: 'info',
          text: 'The 6th Amendment guarantees the right to a speedy trial. Courts balance four factors: length of delay, reason for delay, whether you asserted the right, and prejudice to your defense. Federal law (Speedy Trial Act) requires trial within 70 days of indictment.',
          rights: [
            'Right to be brought to trial without unreasonable delay after charges are filed',
            'Right to assert speedy trial violations to dismiss charges',
            'Dismissal is the remedy for a proven speedy trial violation',
          ],
          advice: 'Track dates carefully: when you were charged, indicted, and each continuance. If delays are excessive, your attorney can file a motion to dismiss for a speedy trial violation. Make sure you formally assert this right — waiving it can forfeit your claim.',
          es: {
            text: 'La Sexta Enmienda garantiza el derecho a un juicio rápido. Los tribunales ponderan cuatro factores: duración del retraso, razón del retraso, si ejerció el derecho, y perjuicio a su defensa. La ley federal exige juicio dentro de 70 días de la acusación formal.',
            rights: ['Derecho a ser llevado a juicio sin demora irrazonable después de presentar cargos', 'Derecho a invocar violaciones del juicio rápido para desestimar cargos', 'La desestimación es el remedio por una violación probada del juicio rápido'],
            advice: 'Registre las fechas cuidadosamente: cuándo fue acusado, imputado formalmente, y cada prórroga. Si los retrasos son excesivos, su abogado puede presentar una moción para desestimar. Asegúrese de ejercer formalmente este derecho — renunciarlo puede forfeit su reclamación.',
          },
        },
      },
    },
  },

  // ── 8th Amendment ───────────────────────────────────────────────────────────
  {
    id: 'eighth', numeral: 'VIII',
    title: '8th Amendment',   subtitle: 'Bail & Post-Arrest Rights',
    esTitle: '8.ª Enmienda',  esSubtitle: 'Fianza y Derechos Post-Arresto',
    tree: {
      root: 'start',
      nodes: {
        start: {
          type: 'question', amendment: '8th',
          text: 'What is your post-arrest situation?',
          options: [
            { label: 'I was just arrested — explain the bail process',       next: 'bail_overview' },
            { label: 'My bail amount seems too high or excessive',           next: 'excessive_bail' },
            { label: 'I was denied bail entirely',                           next: 'bail_denied' },
            { label: 'I cannot afford to pay bail',                          next: 'cannot_afford' },
            { label: 'I am in holding and want to know my rights',           next: 'rights_holding' },
          ],
          es: {
            text: '¿Cuál es su situación después del arresto?',
            options: ['Acabo de ser arrestado — explíqueme el proceso de fianza', 'Mi monto de fianza parece demasiado alto o excesivo', 'Me negaron la fianza completamente', 'No puedo pagar la fianza', 'Estoy detenido y quiero saber mis derechos'],
          },
        },
        bail_overview: {
          type: 'conclusion', severity: 'info',
          text: 'After arrest, you will be brought before a magistrate or judge for a bail hearing (often at arraignment). The court sets bail — an amount intended solely to ensure your return for trial, not to punish you. You have the right to have bail set promptly.',
          rights: [
            'Right to a bail hearing within a reasonable time after arrest',
            'Right to be represented by an attorney at your bail hearing',
            'Right to have bail set at an amount not designed to be punitive',
            'Right to request release on your own recognizance (no money required)',
            'Right to challenge bail as excessive through a motion to reduce',
          ],
          advice: 'At your bail hearing, your attorney should argue for the lowest possible bail or release on your own recognizance. Present evidence of your community ties, stable employment, family, and no history of failing to appear in court.',
          texasNote: 'In Texas, you must be brought before a magistrate without unnecessary delay under Code of Criminal Procedure Art. 15.17. The magistrate will inform you of your charges and rights, and set bail. Texas bail factors are governed by CCP Art. 17.15: the nature of the offense, your circumstances, ability to make bail, and future safety of the community.',
          es: {
            text: 'Después del arresto, será llevado ante un magistrado o juez para una audiencia de fianza (generalmente en la presentación de cargos). El tribunal fija la fianza — un monto destinado únicamente a asegurar su regreso al juicio, no a castigarle.',
            rights: ['Derecho a una audiencia de fianza dentro de un tiempo razonable después del arresto', 'Derecho a ser representado por un abogado en su audiencia de fianza', 'Derecho a que la fianza se fije en un monto que no sea punitivo', 'Derecho a solicitar liberación bajo su propia recognizancia (sin pago)', 'Derecho a impugnar la fianza como excesiva mediante una moción para reducirla'],
            advice: 'En su audiencia de fianza, su abogado debe argumentar por la fianza más baja posible o liberación bajo su propia recognizancia. Presente evidencia de sus vínculos comunitarios, empleo estable, familia y historial limpio de comparecencias.',
            texasNote: 'En Texas, debe ser llevado ante un magistrado sin demora innecesaria bajo el Art. 15.17 del CCP. El magistrado le informará de sus cargos y derechos, y fijará la fianza. Los factores de fianza se rigen por el Art. 17.15: la naturaleza del delito, sus circunstancias, capacidad de pagar la fianza, y la seguridad futura de la comunidad.',
          },
        },
        excessive_bail: {
          type: 'conclusion', severity: 'warning',
          text: 'Under Stack v. Boyle (1951), bail is excessive if it is set higher than reasonably calculated to ensure your appearance at trial. Bail cannot function as punishment or preventive detention absent a formal finding. The government must justify any unusually high amount.',
          rights: [
            'Right to challenge bail through a Motion to Reduce Bail',
            'The government must justify why a high bail amount is necessary',
            'Courts must consider your ability to pay, ties to community, and nature of the offense',
            'Right to appeal an excessive bail ruling',
            'Prior criminal history alone does not justify punitive bail',
          ],
          advice: 'Your attorney should file a Motion to Reduce Bail arguing the amount is disproportionate to the charge and your personal circumstances. Courts must apply the Stack v. Boyle standard. Request a hearing, and bring documentation of income, housing, family, and employment.',
          texasNote: 'Texas CCP Art. 17.15 lists the specific factors Texas courts must weigh: the nature of the offense and circumstances, ability to make bail, the accused\'s criminal record and bond history, and the future safety of victims and the community. Texas courts have reduced bail when the amount was shown to be oppressive relative to the offense.',
          es: {
            text: 'Bajo Stack v. Boyle (1951), la fianza es excesiva si se fija a un monto mayor al razonablemente calculado para asegurar su comparecencia al juicio. La fianza no puede funcionar como castigo. El gobierno debe justificar cualquier monto inusualmente alto.',
            rights: ['Derecho a impugnar la fianza mediante una Moción para Reducir la Fianza', 'El gobierno debe justificar por qué es necesario un monto alto de fianza', 'Los tribunales deben considerar su capacidad de pago, vínculos comunitarios y naturaleza del delito', 'Derecho a apelar una resolución de fianza excesiva', 'El historial criminal previo solo no justifica una fianza punitiva'],
            advice: 'Su abogado debe presentar una Moción para Reducir la Fianza argumentando que el monto es desproporcionado al cargo y sus circunstancias personales. Solicite una audiencia y traiga documentación de ingresos, vivienda, familia y empleo.',
            texasNote: 'El Art. 17.15 del CCP de Texas lista los factores específicos que los tribunales deben ponderar: la naturaleza del delito y las circunstancias, la capacidad de pagar la fianza, el historial criminal y de fianzas del acusado, y la seguridad futura de las víctimas y la comunidad.',
          },
        },
        bail_denied: {
          type: 'question', amendment: '8th',
          text: 'On what basis was bail denied?',
          options: [
            { label: 'Capital offense or potential life sentence',   next: 'bail_denied_capital' },
            { label: 'Court ruled I am a flight risk',               next: 'bail_denied_flight' },
            { label: 'Court ruled I am a danger to the community',   next: 'bail_denied_danger' },
          ],
          es: {
            text: '¿Con qué base le negaron la fianza?',
            options: ['Delito capital o posible cadena perpetua', 'El tribunal determinó que soy un riesgo de fuga', 'El tribunal determinó que soy un peligro para la comunidad'],
          },
        },
        bail_denied_capital: {
          type: 'conclusion', severity: 'warning',
          text: 'Bail may be denied for capital offenses when the "proof is evident" that the defendant committed the crime. This is one of the narrowest exceptions to the right to bail — the prosecution bears the burden of proving guilt is evident.',
          rights: [
            'The prosecution bears the burden of proving proof of guilt is "evident"',
            'You may petition for a writ of habeas corpus to challenge the denial',
            'Right to an attorney to challenge the bail denial hearing',
            'Even in capital cases, bail may be granted if proof is not evident',
          ],
          advice: 'Your attorney should immediately file a writ of habeas corpus challenging the bail denial and arguing that the proof of guilt is not "evident." The burden is on the prosecution — push them to meet it.',
          texasNote: 'Texas Constitution Art. I § 11 permits bail denial for capital offenses when proof is evident. Art. I § 11a extends this to violent or sexual offenses when the defendant has two prior felony convictions. These are narrow exceptions — your attorney can challenge whether the proof standard is actually met.',
          es: {
            text: 'La fianza puede negarse por delitos capitales cuando la "prueba es evidente" de que el acusado cometió el delito. La fiscalía tiene la carga de probar que la culpabilidad es evidente.',
            rights: ['La fiscalía tiene la carga de probar que la prueba de culpabilidad es "evidente"', 'Puede presentar un recurso de hábeas corpus para impugnar la negativa', 'Derecho a un abogado para impugnar la negativa de fianza', 'Incluso en casos capitales, puede otorgarse fianza si la prueba no es evidente'],
            advice: 'Su abogado debe presentar inmediatamente un recurso de hábeas corpus impugnando la negativa de fianza y argumentando que la prueba de culpabilidad no es "evidente." La carga recae en la fiscalía — presione para que la cumpla.',
            texasNote: 'La Constitución de Texas Art. I § 11 permite negar la fianza por delitos capitales cuando la prueba es evidente. El Art. I § 11a extiende esto a delitos violentos o sexuales con dos condenas previas por delitos graves. Su abogado puede impugnar si el estándar de prueba realmente se cumple.',
          },
        },
        bail_denied_flight: {
          type: 'conclusion', severity: 'warning',
          text: 'A court may deny bail if it finds by clear and convincing evidence that no release conditions can reasonably ensure your appearance at trial. You have the right to rebut this finding with evidence of your ties to the community.',
          rights: [
            'The court must find by clear and convincing evidence you are a flight risk',
            'You have the right to present evidence of community ties, employment, and family',
            'The court must consider less restrictive alternatives (ankle monitor, passport surrender)',
            'You may challenge the finding through a habeas corpus petition',
          ],
          advice: 'Your attorney should present strong evidence of community ties: length of residence, employment, family relationships, and a clean record of prior court appearances. Propose specific conditions (ankle monitor, daily check-ins, surrender of passport) as alternatives to full detention.',
          es: {
            text: 'Un tribunal puede negar la fianza si determina por prueba clara y convincente que ninguna condición de liberación puede asegurar razonablemente su comparecencia al juicio. Tiene derecho a refutar este hallazgo con evidencia de sus vínculos comunitarios.',
            rights: ['El tribunal debe determinar por prueba clara y convincente que es un riesgo de fuga', 'Derecho a presentar evidencia de vínculos comunitarios, empleo y familia', 'El tribunal debe considerar alternativas menos restrictivas (monitor electrónico, entrega de pasaporte)', 'Puede impugnar el hallazgo mediante un recurso de hábeas corpus'],
            advice: 'Su abogado debe presentar evidencia sólida de vínculos comunitarios: tiempo de residencia, empleo, relaciones familiares y historial limpio de comparecencias previas. Proponga condiciones específicas (monitor electrónico, presentaciones diarias, entrega de pasaporte) como alternativas a la detención.',
          },
        },
        bail_denied_danger: {
          type: 'conclusion', severity: 'warning',
          text: 'Under United States v. Salerno (1987), courts may detain defendants without bail if the government proves by clear and convincing evidence that no conditions can reasonably assure community safety. Detention must be regulatory — not punitive.',
          rights: [
            'The government bears the burden of clear and convincing evidence of danger',
            'Right to a detention hearing with counsel present',
            'Right to present evidence and cross-examine witnesses at the hearing',
            'Detention must be regulatory (for safety), not used as punishment',
            'Right to seek review through a writ of habeas corpus',
          ],
          advice: 'At your detention hearing, your attorney should challenge whether the government\'s evidence meets the clear and convincing standard, and argue that specific conditions — electronic monitoring, curfew, restricted contact — can adequately protect the community without full detention.',
          es: {
            text: 'Bajo United States v. Salerno (1987), los tribunales pueden detener a acusados sin fianza si el gobierno prueba por prueba clara y convincente que ninguna condición puede razonablemente asegurar la seguridad de la comunidad. La detención debe ser regulatoria — no punitiva.',
            rights: ['El gobierno tiene la carga de prueba clara y convincente del peligro', 'Derecho a una audiencia de detención con abogado presente', 'Derecho a presentar evidencia e interrogar testigos en la audiencia', 'La detención debe ser regulatoria (por seguridad), no usarse como castigo', 'Derecho a buscar revisión mediante recurso de hábeas corpus'],
            advice: 'En su audiencia de detención, su abogado debe impugnar si la evidencia del gobierno cumple el estándar de prueba clara y convincente, y argumentar que condiciones específicas — monitoreo electrónico, toque de queda, contacto restringido — pueden proteger adecuadamente a la comunidad sin detención completa.',
          },
        },
        cannot_afford: {
          type: 'conclusion', severity: 'info',
          text: 'Inability to pay bail does not mean you must remain in jail. You have several options, and courts are constitutionally prohibited from detaining you purely because you are poor when wealthier defendants in the same position would be released.',
          rights: [
            'Right to request release on your own recognizance (ROR)',
            'Right to request a bail reduction hearing based on inability to pay',
            'Right to use a licensed bail bondsman (typically a 10% non-refundable premium)',
            'Inability to pay cash bail cannot be used as punishment for poverty',
            'Right to have an attorney argue for lower bail at a reduction hearing',
          ],
          advice: 'Have your attorney immediately request either ROR or a bail reduction hearing. Provide documentation of your income, assets, and financial circumstances. Courts must consider alternatives to cash bail — inability to pay alone is not a lawful basis for detention.',
          texasNote: 'In Texas, bail bondsmen are licensed under Occupations Code Chapter 1704. The typical non-refundable premium is 10% of the bail amount, and bondsmen may require collateral. Texas has been expanding personal bond (ROR) availability — your attorney should request this first before exploring commercial bonds.',
          es: {
            text: 'No poder pagar la fianza no significa que deba permanecer en la cárcel. Tiene varias opciones, y los tribunales tienen constitucionalmente prohibido detenerle puramente porque es pobre cuando acusados más ricos en la misma situación serían liberados.',
            rights: ['Derecho a solicitar liberación bajo su propia recognizancia (sin pago)', 'Derecho a solicitar una audiencia de reducción de fianza por incapacidad de pago', 'Derecho a usar un agente de fianzas (típicamente una prima no reembolsable del 10%)', 'La incapacidad de pagar la fianza en efectivo no puede usarse como castigo por la pobreza', 'Derecho a que un abogado argumente por una fianza más baja en una audiencia de reducción'],
            advice: 'Haga que su abogado solicite inmediatamente liberación bajo su propia recognizancia o una audiencia de reducción de fianza. Proporcione documentación de sus ingresos, activos y circunstancias financieras. Los tribunales deben considerar alternativas a la fianza en efectivo.',
            texasNote: 'En Texas, los agentes de fianzas están autorizados bajo el Capítulo 1704 del Código de Ocupaciones. La prima no reembolsable típica es el 10% del monto de la fianza. Texas ha ampliado la disponibilidad de fianza personal — su abogado debe solicitarla primero antes de explorar fianzas comerciales.',
          },
        },
        rights_holding: {
          type: 'conclusion', severity: 'critical',
          text: 'Being in holding or pre-trial detention does not strip you of constitutional rights. The 8th Amendment prohibits cruel and unusual punishment. The 14th Amendment\'s due process clause protects pretrial detainees from punishment before conviction.',
          rights: [
            'Right to be free from physical abuse, torture, and excessive force',
            'Right to adequate medical care — denial of serious medical needs is unconstitutional',
            'Right to contact an attorney — this must be actively facilitated',
            'Right to make a reasonable number of phone calls after booking',
            'Right to safe housing conditions — staff must protect you from known dangers',
            'Right to food, water, shelter, and sanitation',
            'Right to be free from punishment before conviction (due process)',
          ],
          advice: 'If you are denied medical care, subjected to abuse, denied attorney access, or held in dangerous conditions, document everything — date, time, who was present, and what happened. Your attorney can file an emergency writ of habeas corpus or a civil rights complaint under 42 U.S.C. § 1983 for constitutional violations.',
          texasNote: 'Texas CCP Art. 15.17 requires that you be allowed at least one phone call within a reasonable time of booking. Texas jail standards under Title 37 TAC Chapter 259 establish minimum conditions for county jails. If staff denies you medical care or subjects you to abuse, you may file a complaint with the Texas Commission on Jail Standards.',
          es: {
            text: 'Estar detenido preventivamente no le quita sus derechos constitucionales. La Octava Enmienda prohíbe el castigo cruel e inusual. La Decimocuarta Enmienda protege a los detenidos preventivos del castigo antes de la condena.',
            rights: ['Derecho a estar libre de abuso físico, tortura y uso excesivo de la fuerza', 'Derecho a atención médica adecuada — negar atención a necesidades médicas graves es inconstitucional', 'Derecho a contactar a un abogado — esto debe ser activamente facilitado', 'Derecho a realizar llamadas telefónicas razonables después del procesamiento', 'Derecho a condiciones de vivienda seguras — el personal debe protegerle de peligros conocidos', 'Derecho a comida, agua, vivienda y saneamiento', 'Derecho a estar libre de castigo antes de la condena (debido proceso)'],
            advice: 'Si le niegan atención médica, le someten a abuso, le niegan acceso a un abogado, o le tienen en condiciones peligrosas, documente todo — fecha, hora, quién estaba presente y qué ocurrió. Su abogado puede presentar un recurso urgente de hábeas corpus o una queja de derechos civiles bajo 42 U.S.C. § 1983.',
            texasNote: 'El Art. 15.17 del CCP de Texas exige que se le permita al menos una llamada telefónica dentro de un tiempo razonable después del procesamiento. Los estándares de cárceles bajo el Título 37 TAC Capítulo 259 establecen condiciones mínimas para cárceles del condado. Puede presentar una queja ante la Comisión de Estándares de Cárceles de Texas.',
          },
        },
      },
    },
  },
];

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  amendment: null,
  nodeId:    null,
  history:   [],
  selected:  null,
  lang:      'en',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function u(key) {
  return UI[state.lang][key];
}

function translateNode(node) {
  if (state.lang === 'en' || !node.es) return node;
  const tr = { ...node, ...node.es };
  if (node.options && node.es.options) {
    tr.options = node.options.map((opt, i) => ({
      ...opt,
      label: node.es.options[i] || opt.label,
    }));
  }
  return tr;
}

// ── Render ────────────────────────────────────────────────────────────────────

function render() {
  renderSidebar();
  if (!state.amendment) { renderWelcome(); return; }
  const node = state.amendment.tree.nodes[state.nodeId];
  if (node.type === 'question') renderQuestion(node);
  else                          renderConclusion(node);
}

function renderSidebar() {
  const lang = state.lang;
  document.getElementById('amendment-nav').innerHTML =
    `<div class="lang-toggle">
      <button class="lang-btn ${lang === 'en' ? 'active' : ''}" onclick="setLang('en')">EN</button>
      <button class="lang-btn ${lang === 'es' ? 'active' : ''}" onclick="setLang('es')">ES</button>
    </div>
    <button class="home-btn ${!state.amendment ? 'active' : ''}" onclick="goHome()">
      <span class="home-icon">⌂</span>
      <span>${u('homeBtn')}</span>
    </button>
    <div class="sidebar-section-label">${u('amendmentsLabel')}</div>` +
    AMENDMENTS.map(a => {
      const title    = lang === 'es' ? a.esTitle    : a.title;
      const subtitle = lang === 'es' ? a.esSubtitle : a.subtitle;
      return `
        <button class="amendment-btn ${state.amendment?.id === a.id ? 'active' : ''}"
                onclick="selectAmendment('${a.id}')">
          <div class="numeral-badge">${a.numeral}</div>
          <div class="btn-amendment-info">
            <div class="btn-amendment-title">${title}</div>
            <div class="btn-amendment-sub">${subtitle}</div>
          </div>
        </button>`;
    }).join('');
}

function renderWelcome() {
  const lang = state.lang;
  document.getElementById('content').innerHTML = `
    <div class="welcome">
      <div class="welcome-eyebrow">${u('eyebrow')}</div>
      <h1 class="welcome-heading">${u('heading')}</h1>
      <p class="welcome-sub">${u('sub')}</p>
      <div class="welcome-cards">
        ${AMENDMENTS.map(a => `
          <button class="welcome-card" onclick="selectAmendment('${a.id}')">
            <div class="wc-numeral">${a.numeral}</div>
            <div class="wc-title">${lang === 'es' ? a.esTitle : a.title}</div>
            <div class="wc-sub">${lang === 'es' ? a.esSubtitle : a.subtitle}</div>
          </button>
        `).join('')}
      </div>
      <p class="welcome-disclaimer">${u('disclaimer')}</p>
    </div>
  `;
}

function renderQuestion(node, preserveSelection = false) {
  const n = translateNode(node);
  document.getElementById('content').innerHTML = `
    <div class="question-section">
      <div class="nav-row">
        ${state.history.length > 0
          ? `<button class="btn-back" onclick="goBack()">${u('backBtn')}</button>`
          : ''}
        <button class="btn-back" onclick="goHome()">${u('homeNavBtn')}</button>
      </div>
      ${n.amendment ? `<div class="amendment-tag">${u('amendmentTag')(n.amendment)}</div>` : ''}
      <h2 class="question-text">${n.text}</h2>
      <div class="options-list">
        ${n.options.map((opt, i) => `
          <label class="option-label" onclick="pickOption(${i}, '${opt.next}')">
            <input type="radio" name="choice">
            <div class="radio-dot"></div>
            <span class="option-text">${opt.label}</span>
          </label>
        `).join('')}
      </div>
      <button class="btn-continue" id="btn-continue" onclick="advance()">
        ${u('continueBtn')}
      </button>
      ${n.texasNote ? `
        <div class="texas-note">
          <div class="texas-note-header"><span class="tx-badge">TX</span><span>${u('txHeader')}</span></div>
          <div class="texas-note-body">${n.texasNote}</div>
        </div>
      ` : ''}
    </div>
  `;
  if (preserveSelection && state.selected !== null) {
    // Restore visual radio state after a language switch
    const prev = state.selected;
    document.querySelectorAll('.option-label').forEach((el, i) => {
      el.classList.toggle('selected', i === prev.idx);
    });
    document.getElementById('btn-continue')?.classList.add('ready');
  } else {
    state.selected = null;
  }
}

function renderConclusion(node) {
  const n = translateNode(node);
  const headers = u('rightsHeader');

  document.getElementById('content').innerHTML = `
    <div class="conclusion-section">
      <div class="nav-row">
        ${state.history.length > 0
          ? `<button class="btn-back" onclick="goBack()">${u('backBtn')}</button>`
          : ''}
        <button class="btn-back" onclick="goHome()">${u('homeNavBtn')}</button>
      </div>

      <div class="alert-card ${n.severity}">
        <div class="alert-header">
          <span class="alert-icon">${{info:'✔', warning:'⚑', critical:'⚠'}[n.severity]}</span>
          <span>${headers[n.severity]}</span>
        </div>
        <div class="alert-body">${n.text}</div>
      </div>

      ${n.rights?.length ? `
        <div class="rights-card">
          <div class="card-label">${u('rightsSubheader')}</div>
          <ul class="rights-list">
            ${n.rights.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${n.advice ? `
        <div class="advice-card">
          <div class="advice-header"><span>💬</span><span>${u('adviceHeader')}</span></div>
          <div class="advice-body">${n.advice}</div>
        </div>
      ` : ''}

      ${n.texasNote ? `
        <div class="texas-note">
          <div class="texas-note-header"><span class="tx-badge">TX</span><span>${u('txHeader')}</span></div>
          <div class="texas-note-body">${n.texasNote}</div>
        </div>
      ` : ''}

      <div class="action-row">
        ${state.history.length > 0
          ? `<button class="btn-secondary" onclick="goBack()">${u('tryAnother')}</button>`
          : ''}
        <button class="btn-primary" onclick="resetAmendment()">${u('startOver')}</button>
      </div>
    </div>
  `;
}

// ── Actions ───────────────────────────────────────────────────────────────────

function selectAmendment(id) {
  state.amendment = AMENDMENTS.find(a => a.id === id);
  state.nodeId    = state.amendment.tree.root;
  state.history   = [];
  state.selected  = null;
  document.body.classList.remove('menu-open'); // close mobile sidebar
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function pickOption(idx, nextId) {
  state.selected = { idx, nextId };
  document.querySelectorAll('.option-label').forEach((el, i) => {
    el.classList.toggle('selected', i === idx);
  });
  const btn = document.getElementById('btn-continue');
  if (btn) btn.classList.add('ready');
}

function advance() {
  if (!state.selected) return;
  state.history.push(state.nodeId);
  state.nodeId   = state.selected.nextId;
  state.selected = null;
  const node = state.amendment.tree.nodes[state.nodeId];
  if (node.type === 'question') renderQuestion(node);
  else                          renderConclusion(node);
  renderSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  if (!state.history.length) return;
  state.nodeId   = state.history.pop();
  state.selected = null;
  const node = state.amendment.tree.nodes[state.nodeId];
  if (node.type === 'question') renderQuestion(node);
  else                          renderConclusion(node);
  renderSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
  state.amendment = null;
  state.nodeId    = null;
  state.history   = [];
  state.selected  = null;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setLang(lang) {
  state.lang = lang;
  renderSidebar();
  if (!state.amendment) { renderWelcome(); return; }
  const node = state.amendment.tree.nodes[state.nodeId];
  if (node.type === 'question') renderQuestion(node, true);  // preserve radio selection
  else                          renderConclusion(node);
}

function resetAmendment() {
  state.nodeId   = state.amendment.tree.root;
  state.history  = [];
  state.selected = null;
  renderQuestion(state.amendment.tree.nodes[state.nodeId]);
  renderSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', render);
