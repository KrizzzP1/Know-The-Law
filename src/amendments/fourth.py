FOURTH_AMENDMENT = {
    'id': 'fourth',
    'title': '4th Amendment',
    'subtitle': '— Search & Seizure',
    'tree': {
        'root': 'start',
        'nodes': {

            # ── Entry ─────────────────────────────────────────────────────────
            'start': {
                'type': 'question',
                'text': 'What is the situation?',
                'amendment': '4th',
                'options': [
                    {'label': 'Police want to search my home',          'next': 'home_warrant'},
                    {'label': 'Police want to search my vehicle',       'next': 'vehicle_stop'},
                    {'label': 'Police stopped me on the street',        'next': 'street_stop'},
                    {'label': 'Police want to search my phone/device',  'next': 'phone_search'},
                ],
            },

            # ── Home search ───────────────────────────────────────────────────
            'home_warrant': {
                'type': 'question',
                'text': 'Do the police have a warrant?',
                'amendment': '4th',
                'options': [
                    {'label': 'Yes, they have a warrant',              'next': 'home_warrant_check'},
                    {'label': 'No warrant',                            'next': 'home_no_warrant'},
                    {'label': "I don't know / they haven't said",      'next': 'home_ask_warrant'},
                ],
            },
            'home_warrant_check': {
                'type': 'question',
                'text': 'Does the warrant specifically name your address?',
                'amendment': '4th',
                'options': [
                    {'label': 'Yes — my correct address is on it',  'next': 'home_warrant_valid'},
                    {'label': 'No, or I cannot verify',             'next': 'home_warrant_invalid'},
                ],
            },
            'home_warrant_valid': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'A valid warrant authorizes the search. You must allow entry, '
                    'but the search is limited to areas and items specifically named in the warrant.'
                ),
                'rights': [
                    'Remain silent — do not answer questions beyond basic identification',
                    'Ask for a copy of the warrant before officers enter',
                    'Observe the search — you may watch but must not interfere',
                    'Document officer names, badge numbers, and anything seized',
                ],
                'advice': (
                    'Say clearly: "I do not consent to this search." '
                    'This verbal non-consent preserves your right to challenge the scope of the search in court '
                    'even when a warrant exists. Do not physically resist. Contact an attorney immediately after.'
                ),
            },
            'home_warrant_invalid': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'A warrant that does not specifically name your address, or is otherwise defective, '
                    'may render the search unconstitutional under the 4th Amendment.'
                ),
                'rights': [
                    'Calmly state: "I do not believe this warrant covers my address"',
                    'Do not physically resist — verbal protest preserves your rights',
                    'Note officer names and badge numbers for your attorney',
                ],
                'advice': (
                    'Say: "I do not consent to this search. I believe this warrant is invalid for my address." '
                    'Do not physically resist entry. Contact an attorney immediately — '
                    'defective warrants can be challenged to suppress any evidence found.'
                ),
            },
            'home_ask_warrant': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'You have the right to ask whether officers have a warrant before opening your door. '
                    'You are not required to open your door without one.'
                ),
                'rights': [
                    'Ask through the closed door: "Do you have a warrant?"',
                    'You may refuse to open the door if there is no warrant',
                    'Verbally state your non-consent if they claim authority to enter',
                ],
                'advice': (
                    'Speak through your closed door: "Do you have a warrant?" '
                    'If the answer is no, say: "I do not consent to a search." '
                    'You do not have to open the door unless they announce exigent circumstances or produce a warrant.'
                ),
            },
            'home_no_warrant': {
                'type': 'question',
                'text': 'Are officers claiming an emergency (exigent circumstances) — such as someone inside is in danger, or hot pursuit of a fleeing suspect?',
                'amendment': '4th',
                'options': [
                    {'label': 'Yes, they claim an emergency',  'next': 'home_exigent'},
                    {'label': 'No emergency claimed',          'next': 'home_no_exigent'},
                ],
            },
            'home_exigent': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'Exigent circumstances are a recognized exception to the warrant requirement. '
                    'Police may enter without a warrant if there is a genuine immediate emergency. '
                    'The scope of entry must be limited to that emergency.'
                ),
                'rights': [
                    'Do not physically resist entry during a claimed emergency',
                    'Verbally state: "I do not consent to any search beyond the emergency"',
                    'The validity and scope of exigent circumstances can be challenged in court',
                ],
                'advice': (
                    'Say: "I do not consent to a search beyond any emergency." '
                    'Document what the officers did and said. '
                    'An attorney can argue that claimed exigent circumstances were fabricated or that the search exceeded their scope.'
                ),
            },
            'home_no_exigent': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'Without a warrant or exigent circumstances, police generally cannot enter your home. '
                    'Your home receives the strongest 4th Amendment protection of any space.'
                ),
                'rights': [
                    'Deny consent clearly: "I do not consent to a search of my home"',
                    'You do not have to open the door',
                    'You do not have to answer any questions',
                ],
                'advice': (
                    'Say through your closed door: "I do not consent to a search. Please leave or get a warrant." '
                    'If they force entry without a warrant or emergency, do not physically resist — '
                    'document everything and call an attorney immediately.'
                ),
            },

            # ── Vehicle search ────────────────────────────────────────────────
            'vehicle_stop': {
                'type': 'question',
                'text': 'What is the context of the vehicle encounter?',
                'amendment': '4th',
                'options': [
                    {'label': 'Routine traffic stop',                        'next': 'vehicle_traffic'},
                    {'label': 'Officers claim probable cause to search',     'next': 'vehicle_probable_cause'},
                    {'label': 'Officers are asking for my consent to search','next': 'vehicle_consent'},
                ],
            },
            'vehicle_traffic': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'During a routine traffic stop, police may ask you to step out of the vehicle. '
                    'They may only search if they have probable cause, your consent, or a warrant.'
                ),
                'rights': [
                    'Provide license, registration, and proof of insurance when asked',
                    'You may remain silent beyond providing those documents',
                    'You may refuse consent to search the vehicle',
                    'You may not be detained longer than necessary for the stop without reasonable suspicion of a crime',
                ],
                'advice': (
                    'Be calm and polite. If asked to search, say: "I do not consent to a search." '
                    'If you want to leave, ask: "Am I free to go?" '
                    'Do not physically resist any search that happens anyway — challenge it in court.'
                ),
            },
            'vehicle_probable_cause': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'Under the automobile exception, police may search a vehicle without a warrant '
                    'if they have probable cause to believe it contains evidence of a crime. '
                    'Whether probable cause actually existed is a question for a court.'
                ),
                'rights': [
                    'Verbally state: "I do not consent to this search"',
                    'Do not physically resist',
                    'You may remain silent',
                    'Ask clearly: "Am I being detained or am I free to go?"',
                ],
                'advice': (
                    'Say: "I do not consent to this search." '
                    'This verbal non-consent preserves your right to argue in court that probable cause did not exist. '
                    'Document everything and contact an attorney.'
                ),
            },
            'vehicle_consent': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'You have the right to refuse consent to search your vehicle. '
                    'Giving consent waives your 4th Amendment protections for that search. '
                    'Refusing consent alone cannot be used as probable cause.'
                ),
                'rights': [
                    'You may refuse: say "I do not consent to a search of my vehicle"',
                    'Refusal is not grounds for arrest or detention on its own',
                    'You cannot be punished solely for refusing consent',
                ],
                'advice': (
                    'Say clearly: "I do not consent to a search of my vehicle." '
                    'If they search anyway, do not resist. Document everything and '
                    'contact an attorney — a warrantless, non-consensual search may be unlawful.'
                ),
            },

            # ── Street stop ───────────────────────────────────────────────────
            'street_stop': {
                'type': 'question',
                'text': 'What is the officer doing?',
                'amendment': '4th',
                'options': [
                    {'label': 'Approaching or asking me questions (consensual)',           'next': 'street_encounter'},
                    {'label': 'Telling me to stop / I cannot leave (detention)',           'next': 'street_detained'},
                    {'label': 'Frisking or patting down my outer clothing',                'next': 'street_frisk'},
                ],
            },
            'street_encounter': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'A consensual police encounter is not a detention. '
                    'You are free to leave if no one has told you to stop or stay.'
                ),
                'rights': [
                    'You may walk away from a consensual encounter',
                    'You are generally not required to answer questions',
                    'Ask clearly: "Am I free to go?"',
                ],
                'advice': (
                    'Calmly ask: "Am I free to go?" '
                    'If the officer says yes, you may leave. '
                    'If the officer says no or is evasive, you are likely being detained — '
                    'state: "I am invoking my right to remain silent."'
                ),
            },
            'street_detained': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'Police may briefly detain you (a Terry stop) only if they have '
                    'reasonable articulable suspicion — specific facts — that you are involved in criminal activity. '
                    'A hunch or your appearance alone is not enough.'
                ),
                'rights': [
                    'Ask: "Am I being detained or am I free to go?"',
                    'You do not have to answer questions (stop-and-identify laws vary by state)',
                    'Detention must be brief and limited to investigating the specific suspicion',
                ],
                'advice': (
                    'Stay calm. Ask: "Am I being detained or am I free to go?" '
                    'If detained, state: "I am invoking my right to remain silent." '
                    'Do not physically resist — an unlawful detention can be challenged in court.'
                ),
            },
            'street_frisk': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'Police may pat down your outer clothing only if they have reasonable suspicion '
                    'that you are armed and dangerous. '
                    'This is a limited search for weapons, not a full search for contraband.'
                ),
                'rights': [
                    'Verbally state: "I do not consent to a search"',
                    'A frisk is limited to outer clothing for weapons only',
                    'Officers may not reach into pockets without additional justification',
                ],
                'advice': (
                    'Say: "I do not consent to this search." Do not physically resist. '
                    'If anything is found during an unlawful frisk, it may be suppressed in court — '
                    'document everything and consult an attorney.'
                ),
            },

            # ── Phone / device ────────────────────────────────────────────────
            'phone_search': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'Under Riley v. California (2014), police generally need a warrant to search your phone, '
                    'even incident to a lawful arrest. '
                    'Your digital privacy receives strong 4th Amendment protection.'
                ),
                'rights': [
                    'You may refuse to hand over or unlock your phone without a warrant',
                    'You are not required to provide a password or biometric to unlock',
                    'This protection applies even if you are under arrest',
                ],
                'advice': (
                    'Say: "I do not consent to a search of my phone. You need a warrant." '
                    'Do not unlock your device. If arrested, police may seize the device but cannot search it without a warrant. '
                    'Contact an attorney immediately.'
                ),
            },

        },
    },
}
