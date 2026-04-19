FIFTH_AMENDMENT = {
    'id': 'fifth',
    'title': '5th Amendment',
    'subtitle': '— Right to Remain Silent',
    'tree': {
        'root': 'start',
        'nodes': {

            # ── Entry ─────────────────────────────────────────────────────────
            'start': {
                'type': 'question',
                'text': 'What is the situation?',
                'amendment': '5th',
                'options': [
                    {'label': 'Police are questioning me',                        'next': 'questioning'},
                    {'label': 'I have been arrested',                             'next': 'arrested'},
                    {'label': 'I am being asked to testify or provide a statement','next': 'testify'},
                    {'label': 'Police want a physical sample or my device password','next': 'compelled_evidence'},
                ],
            },

            # ── Police questioning ─────────────────────────────────────────────
            'questioning': {
                'type': 'question',
                'text': 'Are you currently in police custody — arrested, or not free to leave?',
                'amendment': '5th',
                'options': [
                    {'label': 'Yes, I am in custody or under arrest',  'next': 'in_custody'},
                    {'label': 'No, I believe I am free to leave',      'next': 'not_in_custody'},
                    {'label': "I don't know",                          'next': 'determine_custody'},
                ],
            },
            'determine_custody': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'Your custody status determines which protections apply. '
                    'Ask the officer directly to find out.'
                ),
                'rights': [
                    'If free to go — you are not in custody and may leave',
                    'If not free to go — you are effectively in custody',
                    'Your right to silence applies in both situations',
                    'Miranda warnings are only required for custodial interrogation',
                ],
                'advice': (
                    'Ask the officer: "Am I free to go?" '
                    'If yes, leave. If no, say: '
                    '"I am invoking my right to remain silent. I would like an attorney." '
                    'Then stay completely silent.'
                ),
            },
            'not_in_custody': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'You are not in custody. You have no legal obligation to answer police questions '
                    'in most circumstances. '
                    'Anything you say voluntarily can still be used against you.'
                ),
                'rights': [
                    'You may refuse to answer questions',
                    'You may walk away from a consensual encounter',
                    'You generally cannot be arrested solely for refusing to answer questions',
                ],
                'advice': (
                    'You can say politely: "I prefer not to answer questions without an attorney present." '
                    'You are not required to explain your refusal. '
                    'If unsure, ask: "Am I free to go?" — and leave if allowed.'
                ),
            },
            'in_custody': {
                'type': 'question',
                'text': 'Were you read your Miranda rights? ("You have the right to remain silent...")',
                'amendment': '5th',
                'options': [
                    {'label': 'Yes, I was read Miranda rights',   'next': 'miranda_read'},
                    {'label': 'No, I was not read Miranda rights','next': 'miranda_not_read'},
                ],
            },
            'miranda_read': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'You have been explicitly informed of your rights. '
                    'You are in custody and anything you say can and will be used against you in court.'
                ),
                'rights': [
                    'Right to remain silent — exercise it completely',
                    'Right to an attorney before and during any questioning',
                    'Right to a court-appointed attorney if you cannot afford one',
                    'You may stop answering questions at any time, even if you already started',
                ],
                'advice': (
                    'Say clearly and unambiguously: '
                    '"I am invoking my right to remain silent. I want an attorney." '
                    'Then say absolutely nothing else. '
                    'Do not try to explain, justify, or talk your way out — silence is your strongest protection.'
                ),
            },
            'miranda_not_read': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'If you are in custody and subject to interrogation, '
                    'Miranda warnings are constitutionally required. '
                    'Failure to give them can make your statements inadmissible — '
                    'but your right to remain silent exists regardless.'
                ),
                'rights': [
                    'Your right to silence exists whether or not Miranda was read',
                    'Statements taken in custody without Miranda warnings may be suppressed',
                    'You may invoke your rights at any point in the process',
                ],
                'advice': (
                    'Say: "I am invoking my right to remain silent and my right to an attorney." '
                    'Document that no Miranda warning was given — this is critical for your attorney. '
                    'Stay silent.'
                ),
            },

            # ── Under arrest ───────────────────────────────────────────────────
            'arrested': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'Upon arrest, your 5th Amendment rights are fully in effect. '
                    'You are not required to answer any questions beyond basic booking information.'
                ),
                'rights': [
                    'Right to remain silent — beyond your name and basic identification (varies by state)',
                    'Right to an attorney before answering any substantive questions',
                    'Right to have an attorney present during any interrogation',
                    'Anything you say can be used against you',
                ],
                'advice': (
                    'Say immediately: "I am invoking my right to remain silent. I want an attorney." '
                    'Repeat this if questioned again. '
                    'Do not attempt to talk your way out of an arrest — it almost never helps and frequently causes serious harm.'
                ),
            },

            # ── Testifying ─────────────────────────────────────────────────────
            'testify': {
                'type': 'question',
                'text': 'In what context are you being asked to testify or provide information?',
                'amendment': '5th',
                'options': [
                    {'label': 'I am the suspect or defendant in a criminal case',  'next': 'testify_defendant'},
                    {'label': 'I am a witness (not the person accused)',            'next': 'testify_witness'},
                    {'label': 'I received a grand jury subpoena',                  'next': 'testify_grand_jury'},
                ],
            },
            'testify_defendant': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'As a criminal defendant, you have an absolute constitutional right not to testify. '
                    'The prosecution cannot comment on your silence, and the jury may not infer guilt from it.'
                ),
                'rights': [
                    'You cannot be compelled to testify against yourself',
                    'Prosecutors may not mention your silence to the jury as evidence of guilt',
                    'This is one of the most absolute protections in the Bill of Rights',
                ],
                'advice': (
                    'Consult your attorney before making any decision about testifying. '
                    'Your silence cannot legally be used against you.'
                ),
            },
            'testify_witness': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'As a witness, you may invoke the 5th Amendment only for questions '
                    'where your specific answer might incriminate you personally. '
                    'You cannot refuse to testify entirely unless all testimony could incriminate you.'
                ),
                'rights': [
                    'You may refuse to answer specific questions that could incriminate you personally',
                    'You cannot refuse to appear or to answer questions that only incriminate others',
                    'If granted immunity, you lose the right to refuse those questions',
                ],
                'advice': (
                    'Consult an attorney before testifying as a witness. '
                    'Identify which specific questions could incriminate you '
                    'and invoke the 5th Amendment on those questions only.'
                ),
            },
            'testify_grand_jury': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'Grand jury subpoenas are powerful. You generally must appear when subpoenaed, '
                    'but you may invoke the 5th Amendment on any individual question '
                    'whose answer might incriminate you.'
                ),
                'rights': [
                    'You must appear if properly subpoenaed — you may not simply refuse to show up',
                    'You may invoke the 5th on any incriminating question',
                    'You have the right to consult with your attorney outside the room before answering',
                ],
                'advice': (
                    'You must appear, but for any incriminating question say: '
                    '"On advice of counsel, I invoke my Fifth Amendment privilege against self-incrimination." '
                    'You must consult an attorney before appearing — this is critical.'
                ),
            },

            # ── Compelled evidence ─────────────────────────────────────────────
            'compelled_evidence': {
                'type': 'question',
                'text': 'What type of evidence is being requested?',
                'amendment': '5th',
                'options': [
                    {'label': 'Verbal testimony or written statements',    'next': 'compelled_testimony'},
                    {'label': 'Blood draw, DNA swab, or physical sample',  'next': 'compelled_physical'},
                    {'label': 'Phone password or device unlock',           'next': 'compelled_password'},
                ],
            },
            'compelled_testimony': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'The 5th Amendment protects against compelled testimonial self-incrimination. '
                    'You cannot be forced to make verbal or written statements that incriminate you.'
                ),
                'rights': [
                    'You cannot be forced to make any verbal or written incriminating statement',
                    'This applies to police questioning, depositions, court proceedings, and grand juries',
                ],
                'advice': (
                    'Invoke your rights explicitly: '
                    '"I invoke my Fifth Amendment right against self-incrimination." '
                    'Then consult an attorney before saying anything further.'
                ),
            },
            'compelled_physical': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'Physical evidence such as blood draws and DNA swabs is generally not protected by the 5th Amendment '
                    'because it is not considered "testimonial." Courts have upheld compelled physical samples. '
                    'Your protection here comes primarily from the 4th Amendment.'
                ),
                'rights': [
                    'The 4th Amendment requires a warrant or recognized exception for most physical samples',
                    'You may object and ask whether a warrant exists',
                    'Do not physically resist — state your objection verbally',
                ],
                'advice': (
                    'State: "I do not consent to this." Ask: "Do you have a warrant?" '
                    'Do not physically resist. Your 4th Amendment rights — not the 5th — are the primary protection here. '
                    'Consult an attorney about the specific circumstances.'
                ),
            },
            'compelled_password': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'This is an evolving area of law. Courts are divided. '
                    'Compelling a memorized password is more likely protected under the 5th Amendment (a testimonial act) '
                    'than compelling a fingerprint to unlock a device (treated as a physical act). '
                    'Your jurisdiction matters significantly.'
                ),
                'rights': [
                    'Compelling a memorized password may be protected as a testimonial act',
                    'Compelling a biometric (fingerprint/face) is generally afforded less 5th Amendment protection',
                    'You may refuse and assert your 5th Amendment privilege',
                ],
                'advice': (
                    'Say: "I invoke my Fifth Amendment right and do not consent to providing my password." '
                    'Do not unlock your device. '
                    'This area of law is actively being litigated — consult an attorney immediately.'
                ),
            },

        },
    },
}
