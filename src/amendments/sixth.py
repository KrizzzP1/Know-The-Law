SIXTH_AMENDMENT = {
    'id': 'sixth',
    'title': '6th Amendment',
    'subtitle': '— Right to Counsel',
    'tree': {
        'root': 'start',
        'nodes': {

            # ── Entry ─────────────────────────────────────────────────────────
            'start': {
                'type': 'question',
                'text': 'What is the situation?',
                'amendment': '6th',
                'options': [
                    {'label': 'I have been arrested and want an attorney',               'next': 'arrested_counsel'},
                    {'label': 'Police are questioning me and I want an attorney',        'next': 'interrogation_counsel'},
                    {'label': 'I cannot afford an attorney',                             'next': 'cannot_afford'},
                    {'label': 'I was denied an attorney at a critical stage',            'next': 'absent_counsel'},
                    {'label': 'I want to know my right to be informed of charges',      'next': 'know_charges'},
                    {'label': 'I want to know about my right to a speedy trial',        'next': 'speedy_trial'},
                ],
            },

            # ── Arrested — right to counsel ────────────────────────────────────
            'arrested_counsel': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'Upon arrest, you have the right to an attorney. '
                    'This right attaches at the initiation of formal criminal proceedings — '
                    'arrest, arraignment, indictment, or first appearance — whichever comes first.'
                ),
                'rights': [
                    'Right to an attorney at all critical stages of prosecution',
                    'Right to consult privately with your attorney before questioning',
                    'Right to a court-appointed attorney (public defender) if you cannot afford one',
                    'Right to an attorney of your own choosing (if you can afford one)',
                ],
                'advice': (
                    'Say immediately and clearly: "I want an attorney." '
                    'Police must stop all questioning once you invoke this right. '
                    'Do not answer any questions until your attorney is present. '
                    'If questioning continues, repeat: "I want an attorney and I am not answering questions."'
                ),
            },

            # ── Interrogation — right to counsel ───────────────────────────────
            'interrogation_counsel': {
                'type': 'question',
                'text': 'Have you already asked for an attorney during this encounter?',
                'amendment': '6th',
                'options': [
                    {'label': 'Yes, I already asked for an attorney',  'next': 'already_invoked'},
                    {'label': 'No, I have not asked yet',              'next': 'invoke_now'},
                ],
            },
            'already_invoked': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'Once you have invoked your right to an attorney, all questioning must stop immediately. '
                    'Any statements obtained after that point without an attorney present may be inadmissible.'
                ),
                'rights': [
                    'All interrogation must cease the moment you request an attorney',
                    'Police may not resume questioning unless your attorney is present or you re-initiate contact',
                    'Statements taken in violation of this right may be suppressed at trial',
                ],
                'advice': (
                    'If questioning continues after you already invoked, stay completely silent. '
                    'You may repeat: "I have already asked for an attorney. I will not answer questions without one present." '
                    'Document that questioning continued after your request — this is critical for your attorney.'
                ),
            },
            'invoke_now': {
                'type': 'conclusion',
                'severity': 'critical',
                'text': (
                    'You can invoke your right to an attorney at any moment during questioning. '
                    'The invocation must be clear and unambiguous. '
                    'Prior answers do not waive your right to stop and demand counsel.'
                ),
                'rights': [
                    'You may demand an attorney at any point during questioning',
                    'Questioning must stop immediately upon a clear, unambiguous request',
                    'Answering earlier questions does not forfeit your right to stop now',
                ],
                'advice': (
                    'Say right now: "I want an attorney. I will not answer any questions without an attorney present." '
                    'Then stay completely silent. '
                    'Do not answer "just one more question" — your right is absolute once clearly invoked.'
                ),
            },

            # ── Cannot afford an attorney ──────────────────────────────────────
            'cannot_afford': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'Under Gideon v. Wainwright (1963), if you face potential imprisonment '
                    'and cannot afford an attorney, the state must provide one at no cost to you. '
                    'This is an absolute right.'
                ),
                'rights': [
                    'Right to a court-appointed attorney (public defender) in any case where imprisonment is possible',
                    'Right to this appointment before your trial begins',
                    'Right to effective assistance of counsel — an incompetent defense is a constitutional violation',
                ],
                'advice': (
                    'At your arraignment or first court appearance, tell the judge: '
                    '"I cannot afford an attorney and I am requesting a court-appointed attorney." '
                    'Do not attempt to represent yourself — '
                    'exercise this right at your first opportunity.'
                ),
            },

            # ── Denied counsel at critical stage ───────────────────────────────
            'absent_counsel': {
                'type': 'conclusion',
                'severity': 'warning',
                'text': (
                    'The 6th Amendment guarantees the right to counsel at all "critical stages" of prosecution: '
                    'arraignment, preliminary hearings, plea negotiations, trial, and sentencing. '
                    'Evidence or statements obtained without counsel at a critical stage may be challengeable.'
                ),
                'rights': [
                    'Right to attorney at arraignment, bail hearings, preliminary hearings, plea bargaining, trial, and sentencing',
                    'Evidence or admissions obtained at critical stages without counsel may be suppressed',
                    'Constitutionally ineffective assistance of counsel is grounds for appeal or a new trial',
                ],
                'advice': (
                    'Document precisely when and where you were denied counsel and at which stage of proceedings. '
                    'Raise this immediately with your attorney — '
                    'evidence or statements obtained at critical stages without counsel present may be suppressed or reversed.'
                ),
            },

            # ── Right to know charges ──────────────────────────────────────────
            'know_charges': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'The 6th Amendment guarantees your right to be informed of the nature and cause '
                    'of the accusations against you. '
                    'This means you must receive specific, written notice of every charge.'
                ),
                'rights': [
                    'Right to be told specifically which crime you are charged with',
                    'Right to receive written notice of all charges',
                    'Right to know the charges before you are required to enter a plea',
                    'This right continues through trial — vague charges can be challenged',
                ],
                'advice': (
                    'At your arraignment, if the charges are unclear or not stated specifically, '
                    'tell your attorney or state to the judge: '
                    '"I have not been informed of the specific charges against me." '
                    'This is a foundational right that must be protected from the outset.'
                ),
            },

            # ── Right to speedy trial ──────────────────────────────────────────
            'speedy_trial': {
                'type': 'conclusion',
                'severity': 'info',
                'text': (
                    'The 6th Amendment guarantees the right to a speedy trial. '
                    'Courts balance four factors: length of delay, reason for delay, '
                    'whether you asserted the right, and prejudice to your defense. '
                    'Federal law (Speedy Trial Act) requires trial within 70 days of indictment.'
                ),
                'rights': [
                    'Right to be brought to trial without unreasonable delay after charges are filed',
                    'Right to assert speedy trial violations to dismiss charges',
                    'Dismissal is the remedy for a proven speedy trial violation',
                ],
                'advice': (
                    'Track dates carefully: when you were charged, indicted, and each continuance. '
                    'If delays are excessive, your attorney can file a motion to dismiss for a speedy trial violation. '
                    'Make sure you formally assert this right — waiving it can forfeit your claim.'
                ),
            },

        },
    },
}
