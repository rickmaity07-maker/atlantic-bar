export type Locale = "de" | "en";

interface Dictionary {
  nav: {
    about: string;
    cocktails: string;
    gallery: string;
    nights: string;
    reserve: string;
    menu: string;
    spielzeug: string;
    more: string;
    admin: string;
    signOut: string;
    signIn: string;
    profile: string;
  };
  common: {
    backToMain: string;
    backToLounge: string;
  };
  hero: {
    subtitleBar: string;
    tagline: string;
    reserveBtn: string;
    discoverBtn: string;
    scroll: string;
    reopenTitle: string;
    reopenSubtitle: string;
    reopenDate: string;
    reopenFrom: string;
    reopenNote: string;
    offersTitle: string;
    offersTagline: string;
    offersBody: string;
    offer1: string;
    offer2: string;
    offer3: string;
    offersMore: string;
    offersFooter: string;
  };
  about: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    description: string;
    est: string;
    statYearsLabel: string;
    statPoursLabel: string;
    statSeatsLabel: string;
  };
  cocktails: { eyebrow: string; title: string; seeMore: string };
  gallery: { eyebrow: string; title: string };
  menu: {
    eyebrow: string;
    title: string;
    tabs: {
      signature: string;
      classics: string;
      spirits: string;
      wine: string;
      champagne: string;
      nonAlcoholic: string;
      barSnacks: string;
    };
  };
  spielzeug: {
    eyebrow: string;
    title: string;
    description: string;
    exploreBtn: string;
  };
  nights: {
    eyebrow: string;
    title: string;
    schedule: { day: string; title: string; time: string }[];
  };
  testimonials: { text: string; author: string }[];
  reservation: {
    eyebrow: string;
    title: string;
    description: string;
    fields: { name: string; date: string; guests: string };
    namePlaceholder: string;
    submitIdle: string;
    submitSending: string;
    submitSent: string;
    successMessage: string;
    signInPrompt: string;
    signInBtn: string;
    verifyPrompt: string;
    verifyBtn: string;
    genericError: string;
    pleaseSignIn: string;
  };
  footer: {
    tagline: string;
    hours: string;
    hoursLines: string[];
    visit: string;
    follow: string;
    copyright: string;
  };
  login: {
    title: string;
    titleSignup: string;
    subtitle: string;
    tabSignIn: string;
    tabSignUp: string;
    emailLabel: string;
    passwordLabel: string;
    submitIdle: string;
    submitSignup: string;
    submitLoading: string;
    or: string;
    googleBtn: string;
    facebookBtn: string;
    phoneNote: string;
    errorEmailInUse: string;
    errorWrongCredentials: string;
    errorWeakPassword: string;
    errorPopupClosed: string;
    errorGeneric: string;
    errorSyncFailed: string;
  };
  verifyPhone: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    phoneHint: string;
    phonePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    codeLabel: string;
    confirmBtn: string;
    confirmingBtn: string;
    errorNotSignedIn: string;
    errorVerifierNotReady: string;
    errorRequestCodeFirst: string;
    errorOperationNotAllowed: string;
    errorInvalidPhone: string;
    errorBilling: string;
    errorTooManyRequests: string;
    errorCaptcha: string;
    errorInvalidCode: string;
    errorCodeExpired: string;
    errorAlreadyInUse: string;
    errorGeneric: string;
  };
  intro: {
    walkTheRoom: string;
    scrollToEnter: string;
    dragToLook: string;
    skipIntro: string;
  };
}

const de: Dictionary = {
  nav: {
    about: "Über uns",
    cocktails: "Cocktails",
    gallery: "Galerie",
    nights: "Abende",
    reserve: "Reservieren",
    menu: "Speisekarte",
    spielzeug: "Spielzeug",
    more: "Mehr",
    admin: "Admin",
    signOut: "Abmelden",
    signIn: "Anmelden",
    profile: "Profil",
  },
  common: {
    backToMain: "Zurück zur Hauptseite",
    backToLounge: "Zurück zur Lounge",
  },
  hero: {
    subtitleBar: "Bar",
    tagline: "Luxuriöses Ambiente & Premium-Abende",
    reserveBtn: "Tisch reservieren",
    discoverBtn: "Die Lounge entdecken",
    scroll: "Scrollen",
    reopenTitle: "Weiter für Euch Offen!",
    reopenSubtitle: "ATLANTIC LOUNGE BAR ist wieder da",
    reopenDate: "Ab 22.08.2026 — Täglich ab 09:00 Uhr",
    reopenFrom: "Weiter für Euch offen ab 09:00 Uhr",
    reopenNote: "",
    offersTitle: "Aktuelle Angebote & Aktionen",
    offersTagline: "Luxury Vibes & Premium Nights",
    offersBody:
      "MIT VIELEN GUTEN NEUEN ANGEBOTEN FÜR ALLE GETRÄNKE UND SPASS WIE IMMER zusammen mit gute Vibes",
    offer1: "2 BIER bestellen — das 3. von uns!",
    offer2: "1 SHOT plus — 1 von uns!",
    offer3: "2 VODKA Mische — eine plus!",
    offersMore: "Und viele weitere Angebote noch!",
    offersFooter: "Auch wie jedes Mal für die schönste Nächte zusammen zum Erleben.",
  },
  about: {
    eyebrow: "Unsere Geschichte",
    titlePre: "Ein Rückzugsort",
    titleHighlight: "nach Einbruch der Dunkelheit",
    description:
      "Hinter einer unauffälligen Tür gelegen, wurde die Atlantic Lounge Bar für lange Gespräche und langsam servierte Drinks geschaffen. Messingbeschläge fangen das Kerzenlicht ein, die Vinylmusik läuft leise und warm, und jeder Sitzplatz ist nah genug, um den Shaker zu hören, aber weit genug entfernt, um Ihre Geheimnisse zu wahren. Hier kommt die Stadt zur Ruhe.",
    est: "Gegr.",
    statYearsLabel: "Jahre im Ausschank",
    statPoursLabel: "Signature Drinks",
    statSeatsLabel: "Samtene Sitzplätze",
  },
  cocktails: {
    eyebrow: "Handgemacht",
    title: "Signature Drinks",
    seeMore: "Mehr anzeigen",
  },
  gallery: {
    eyebrow: "Im Inneren",
    title: "Galerie",
  },
  menu: {
    eyebrow: "Unsere Karte",
    title: "Vollständige Speisekarte",
    tabs: {
      signature: "Signature Drinks",
      classics: "Klassiker",
      spirits: "Spirituosen",
      wine: "Wein",
      champagne: "Champagner",
      nonAlcoholic: "Alkoholfrei",
      barSnacks: "Bar Snacks",
    },
  },
  spielzeug: {
    eyebrow: "Entdecken",
    title: "Spielzeug",
    description:
      "Eine kuratierte Auswahl besonderer Stücke — handverlesen für den neugierigen Gast.",
    exploreBtn: "Entdecken",
  },
  nights: {
    eyebrow: "Was läuft",
    title: "Premium-Abende",
    schedule: [
      { day: "Donnerstag", title: "Golden Hour Jazz", time: "19 — 22 Uhr" },
      { day: "Freitag", title: "Live-DJ · Deep House", time: "21 — 1 Uhr" },
      { day: "Samstag", title: "Premium-Abend", time: "21 — 2 Uhr" },
      { day: "Sonntag", title: "Velvet Sessions, Akustik", time: "18 — 21 Uhr" },
    ],
  },
  testimonials: [
    {
      text: "Jede Ecke leuchtet wie für einen Film beleuchtet. Allein der Old Fashioned ist den Besuch wert.",
      author: "— Condé Nast Traveller",
    },
    {
      text: "Die Art von Raum, um den man einen ganzen Abend plant. Langsam, golden, unvergesslich.",
      author: "— City Nightlife Guide",
    },
    {
      text: "Die Atlantic Lounge jagt keinen Trends hinterher — sie hat sich ihre eigene Stunde der Nacht geschaffen.",
      author: "— The Weekend Review",
    },
  ],
  reservation: {
    eyebrow: "Heute Abend dabei sein",
    title: "Reservieren Sie Ihren Tisch",
    description:
      "Plätze werden langsam vergeben. Sagen Sie uns, wann Sie ankommen möchten, und wir halten Ihre Ecke des Raums frei.",
    fields: { name: "Name", date: "Datum", guests: "Gäste" },
    namePlaceholder: "Ihr Name",
    submitIdle: "Tisch anfragen",
    submitSending: "Wird gesendet…",
    submitSent: "Tisch angefragt ✦",
    successMessage: "Ihre Tischanfrage wurde gesendet — wir bestätigen in Kürze.",
    signInPrompt:
      "Melden Sie sich an, um einen Tisch anzufragen — das sorgt für Fairness und hilft uns, Sie bei Änderungen zu erreichen.",
    signInBtn: "Anmelden zum Reservieren",
    verifyPrompt:
      "Fast geschafft — bestätigen Sie Ihre Telefonnummer, um Ihr Konto einzurichten.",
    verifyBtn: "Telefonnummer bestätigen",
    genericError: "Etwas ist schiefgelaufen.",
    pleaseSignIn: "Bitte melden Sie sich zuerst an.",
  },
  footer: {
    tagline: "Luxuriöses Ambiente & Premium-Abende",
    hours: "Öffnungszeiten",
    hoursLines: [
      "Di — Mi · 18 — 24 Uhr",
      "Do — Sa · 18 — 2 Uhr",
      "So · 17 — 22 Uhr",
      "Mo · Geschlossen",
    ],
    visit: "Besuchen Sie uns",
    follow: "Folgen Sie uns",
    copyright: "Atlantic Lounge Bar. Design-Mockup — nur zu Demonstrationszwecken.",
  },
  login: {
    title: "Anmelden",
    titleSignup: "Konto erstellen",
    subtitle: "Ein Login für alle — Gäste wie Team.",
    tabSignIn: "Anmelden",
    tabSignUp: "Registrieren",
    emailLabel: "E-Mail",
    passwordLabel: "Passwort",
    submitIdle: "Anmelden",
    submitSignup: "Konto erstellen",
    submitLoading: "Bitte warten…",
    or: "oder",
    googleBtn: "Mit Google fortfahren",
    facebookBtn: "Mit Facebook fortfahren",
    phoneNote:
      "Bei der Anmeldung mit Google oder Facebook bestätigen Sie anschließend Ihre Telefonnummer per SMS-Code, bevor Sie einen Tisch anfragen können.",
    errorEmailInUse:
      "Ein Konto mit dieser E-Mail existiert bereits — bitte stattdessen anmelden.",
    errorWrongCredentials: "Falsche E-Mail oder falsches Passwort.",
    errorWeakPassword: "Das Passwort sollte mindestens 6 Zeichen haben.",
    errorPopupClosed: "Die Anmeldung wurde abgebrochen.",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    errorSyncFailed:
      "Angemeldet, aber Ihr Profil konnte nicht synchronisiert werden. Bitte versuchen Sie es erneut.",
  },
  verifyPhone: {
    title: "Telefonnummer bestätigen",
    subtitle:
      "Nur ein kurzer Schritt — wir senden Ihnen einen 6-stelligen Code per SMS, um zu bestätigen, dass Sie es wirklich sind.",
    phoneLabel: "Telefonnummer",
    phoneHint: "Bitte mit Ländervorwahl, z. B. +49 für Deutschland.",
    phonePlaceholder: "+49 151 23456789",
    sendBtn: "Code senden",
    sendingBtn: "Wird gesendet…",
    codeLabel: "6-stelliger Code",
    confirmBtn: "Code bestätigen",
    confirmingBtn: "Wird bestätigt…",
    errorNotSignedIn: "Nicht angemeldet.",
    errorVerifierNotReady: "Verifizierung nicht bereit — bitte erneut versuchen.",
    errorRequestCodeFirst: "Bitte zuerst einen Code anfordern.",
    errorOperationNotAllowed:
      "Die Telefonanmeldung ist für dieses Projekt noch nicht aktiviert — bitte den Administrator kontaktieren.",
    errorInvalidPhone:
      "Diese Telefonnummer scheint ungültig zu sein — bitte mit Ländervorwahl angeben, z. B. +49 151 23456789.",
    errorBilling:
      "SMS-Codes erfordern ein aktiviertes Abrechnungskonto — bitte den Administrator kontaktieren.",
    errorTooManyRequests:
      "Zu viele Versuche — bitte einige Minuten warten und erneut versuchen.",
    errorCaptcha:
      "Verifizierung fehlgeschlagen — bitte Seite neu laden und erneut versuchen.",
    errorInvalidCode:
      "Der Code stimmt nicht überein — bitte SMS prüfen und erneut versuchen.",
    errorCodeExpired: "Der Code ist abgelaufen — bitte einen neuen anfordern.",
    errorAlreadyInUse:
      "Diese Telefonnummer ist bereits mit einem anderen Konto verknüpft.",
    errorGeneric: "Etwas ist schiefgelaufen.",
  },
  intro: {
    walkTheRoom: "Den Raum erkunden",
    scrollToEnter: "Scrollen zum Betreten",
    dragToLook: "Ziehen zum Umschauen",
    skipIntro: "Intro überspringen →",
  },
};

const en: Dictionary = {
  nav: {
    about: "About",
    cocktails: "Cocktails",
    gallery: "Gallery",
    nights: "Nights",
    reserve: "Reserve",
    menu: "Menu",
    spielzeug: "Spielzeug",
    more: "More",
    admin: "Admin",
    signOut: "Sign Out",
    signIn: "Sign In",
    profile: "Profile",
  },
  common: {
    backToMain: "Back to main page",
    backToLounge: "Back to Lounge",
  },
  hero: {
    subtitleBar: "Bar",
    tagline: "Luxury Vibes & Premium Nights",
    reserveBtn: "Reserve a Table",
    discoverBtn: "Discover the Lounge",
    scroll: "Scroll",
    reopenTitle: "Open for You Again!",
    reopenSubtitle: "ATLANTIC LOUNGE BAR is back",
    reopenDate: "From 22.08.2026 — Daily from 09:00",
    reopenFrom: "Open for you daily from 09:00",
    reopenNote: "",
    offersTitle: "Current Offers & Specials",
    offersTagline: "Luxury Vibes & Premium Nights",
    offersBody:
      "WITH MANY GREAT NEW OFFERS ON ALL DRINKS AND FUN AS ALWAYS with good vibes",
    offer1: "Order 2 BEERS — the 3rd is on us!",
    offer2: "1 SHOT plus — 1 on us!",
    offer3: "2 VODKA mixers — one on us!",
    offersMore: "And many more offers still!",
    offersFooter: "As always, for the most beautiful nights to experience together.",
  },
  about: {
    eyebrow: "Our Story",
    titlePre: "A Sanctuary",
    titleHighlight: "After Dark",
    description:
      "Tucked behind an unmarked door, Atlantic Lounge Bar was built for long conversations and slow-poured drinks. Brass fixtures catch the candlelight, the vinyl runs low and warm, and every seat is close enough to hear the shaker but far enough to keep your secrets. This is where the city comes to be still.",
    est: "Est.",
    statYearsLabel: "Years Pouring",
    statPoursLabel: "Signature Pours",
    statSeatsLabel: "Seats of Velvet",
  },
  cocktails: {
    eyebrow: "Handcrafted",
    title: "Signature Pours",
    seeMore: "See More",
  },
  gallery: {
    eyebrow: "Inside the Room",
    title: "Gallery",
  },
  menu: {
    eyebrow: "Our Menu",
    title: "Full Menu",
    tabs: {
      signature: "Signature Drinks",
      classics: "Classics",
      spirits: "Spirits",
      wine: "Wine",
      champagne: "Champagne",
      nonAlcoholic: "Non-Alcoholic",
      barSnacks: "Bar Snacks",
    },
  },
  spielzeug: {
    eyebrow: "Discover",
    title: "Spielzeug",
    description:
      "A curated collection of exceptional pieces — handpicked for the curious guest.",
    exploreBtn: "Explore",
  },
  nights: {
    eyebrow: "What's On",
    title: "Premium Nights",
    schedule: [
      { day: "Thursday", title: "Golden Hour Jazz", time: "7 — 10 PM" },
      { day: "Friday", title: "Live DJ · Deep House", time: "9 PM — 1 AM" },
      { day: "Saturday", title: "Premium Nights", time: "9 PM — 2 AM" },
      { day: "Sunday", title: "Velvet Sessions, Acoustic", time: "6 — 9 PM" },
    ],
  },
  testimonials: [
    {
      text: "Every corner glows like it was lit for a film. The Old Fashioned alone is worth the door.",
      author: "— Condé Nast Traveller",
    },
    {
      text: "The kind of room you plan an entire evening around. Slow, golden, unforgettable.",
      author: "— City Nightlife Guide",
    },
    {
      text: "Atlantic Lounge doesn't chase trends — it built its own hour of the night.",
      author: "— The Weekend Review",
    },
  ],
  reservation: {
    eyebrow: "Join Us Tonight",
    title: "Reserve Your Table",
    description:
      "Seats are poured out slowly. Tell us when you'd like to arrive and we'll hold your corner of the room.",
    fields: { name: "Name", date: "Date", guests: "Guests" },
    namePlaceholder: "Your name",
    submitIdle: "Request Reservation",
    submitSending: "Sending…",
    submitSent: "Table Requested ✦",
    successMessage: "Your table request has been sent — we'll confirm shortly.",
    signInPrompt:
      "Sign in to request a table — it keeps things fair and helps us reach you if plans change.",
    signInBtn: "Sign In to Reserve",
    verifyPrompt:
      "Almost there — confirm your phone number to finish setting up your account.",
    verifyBtn: "Verify Phone Number",
    genericError: "Something went wrong.",
    pleaseSignIn: "Please sign in first.",
  },
  footer: {
    tagline: "Luxury Vibes & Premium Nights",
    hours: "Hours",
    hoursLines: [
      "Tue — Wed · 6 PM – 12 AM",
      "Thu — Sat · 6 PM – 2 AM",
      "Sun · 5 PM – 10 PM",
      "Mon · Closed",
    ],
    visit: "Visit",
    follow: "Follow",
    copyright: "Atlantic Lounge Bar. Design mock — for demonstration purposes only.",
  },
  login: {
    title: "Sign In",
    titleSignup: "Create Account",
    subtitle: "One login for everyone — guests and staff alike.",
    tabSignIn: "Sign In",
    tabSignUp: "Sign Up",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitIdle: "Sign In",
    submitSignup: "Create Account",
    submitLoading: "Please wait…",
    or: "or",
    googleBtn: "Continue with Google",
    facebookBtn: "Continue with Facebook",
    phoneNote:
      "Signing in with Google or Facebook will ask you to confirm your phone number by SMS code before you can request a table.",
    errorEmailInUse:
      "An account with that email already exists — try signing in instead.",
    errorWrongCredentials: "Incorrect email or password.",
    errorWeakPassword: "Password should be at least 6 characters.",
    errorPopupClosed: "Sign-in was cancelled.",
    errorGeneric: "Something went wrong. Please try again.",
    errorSyncFailed:
      "Signed in, but couldn't sync your profile. Please try again.",
  },
  verifyPhone: {
    title: "Confirm Your Phone",
    subtitle:
      "One quick step — we'll text you a 6-digit code to confirm it's really you before you can request a table.",
    phoneLabel: "Phone number",
    phoneHint: "Include the country code, e.g. +49 for Germany.",
    phonePlaceholder: "+49 151 23456789",
    sendBtn: "Send Code",
    sendingBtn: "Sending…",
    codeLabel: "6-digit code",
    confirmBtn: "Confirm Code",
    confirmingBtn: "Confirming…",
    errorNotSignedIn: "Not signed in.",
    errorVerifierNotReady: "Verifier not ready — refresh and try again.",
    errorRequestCodeFirst: "Request a code first.",
    errorOperationNotAllowed:
      "Phone sign-in isn't enabled for this project yet — please contact the administrator.",
    errorInvalidPhone:
      "That phone number doesn't look valid — include the country code, e.g. +49 151 23456789.",
    errorBilling:
      "SMS codes need billing enabled on this project — please contact the administrator.",
    errorTooManyRequests:
      "Too many attempts — please wait a few minutes and try again.",
    errorCaptcha: "Verification check failed — refresh the page and try again.",
    errorInvalidCode: "That code doesn't match — check the SMS and try again.",
    errorCodeExpired: "That code expired — request a new one.",
    errorAlreadyInUse:
      "That phone number is already linked to a different account.",
    errorGeneric: "Something went wrong.",
  },
  intro: {
    walkTheRoom: "Walk the room",
    scrollToEnter: "Scroll to enter",
    dragToLook: "Drag to look around",
    skipIntro: "Skip Intro →",
  },
};

export const translations: Record<Locale, Dictionary> = { de, en };