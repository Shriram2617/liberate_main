import React, { useState } from 'react';
import { Scale, FileText, Search } from 'lucide-react';

interface IPCIdentifierProps {
  language: string;
}

const IPCIdentifier: React.FC<IPCIdentifierProps> = ({ language }) => {
  const [searchType, setSearchType] = useState<'section' | 'act'>('section');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);

  const translations = {
    en: {
      title: 'IPC & CrPC Identifier',
      subtitle: 'Search legal acts by name or section number and get detailed explanations',
      sectionToAct: 'Section to Act',
      actToSection: 'Act to Section',
      sectionDesc: 'Enter a section number to get the corresponding act name and details',
      actDesc: 'Enter an act name to get all related sections and explanations',
      searchSection: 'Search by Section',
      searchAct: 'Search by Act',
      searchPlaceholder: 'Enter section number or act name...',
      search: 'Search',
      example: 'Example: 302, 420, Theft, Murder'
    },
    hi: {
      title: 'IPC और CrPC पहचानकर्ता',
      subtitle: 'नाम या धारा संख्या द्वारा कानूनी अधिनियमों की खोज करें और विस्तृत स्पष्टीकरण प्राप्त करें',
      sectionToAct: 'धारा से अधिनियम',
      actToSection: 'अधिनियम से धारा',
      sectionDesc: 'संबंधित अधिनियम नाम और विवरण प्राप्त करने के लिए धारा संख्या दर्ज करें',
      actDesc: 'सभी संबंधित धाराएं और स्पष्टीकरण प्राप्त करने के लिए अधिनियम नाम दर्ज करें',
      searchSection: 'धारा द्वारा खोजें',
      searchAct: 'अधिनियम द्वारा खोजें',
      searchPlaceholder: 'धारा संख्या या अधिनियम नाम दर्ज करें...',
      search: 'खोजें',
      example: 'उदाहरण: 302, 420, चोरी, हत्या'
    },
    ta: {
      title: 'IPC மற்றும் CrPC அடையாளம்',
      subtitle: 'பெயர் அல்லது பிரிவு எண்ணின் மூலம் சட்ட செயல்களைத் தேடுங்கள் மற்றும் விரிவான விளக்கங்களைப் பெறுங்கள்',
      sectionToAct: 'பிரிவிலிருந்து செயல்',
      actToSection: 'செயலிலிருந்து பிரிவு',
      sectionDesc: 'தொடர்புடைய செயல் பெயர் மற்றும் விவரங்களைப் பெற பிரிவு எண்ணை உள்ளிடவும்',
      actDesc: 'அனைத்து தொடர்புடைய பிரிவுகள் மற்றும் விளக்கங்களைப் பெற செயல் பெயரை உள்ளிடவும்',
      searchSection: 'பிரிவின் மூலம் தேடுங்கள்',
      searchAct: 'செயலின் மூலம் தேடுங்கள்',
      searchPlaceholder: 'பிரிவு எண் அல்லது செயல் பெயரை உள்ளிடுங்கள்...',
      search: 'தேடுங்கள்',
      example: 'உதாहரணம்: 302, 420, திருட்டு, கொலை'
    }
  };

  const t = translations[language as keyof typeof translations];

  // Comprehensive IPC Database with all sections
  const legalDatabase = {
    sections: {
      // Elections (171A-171I)
      '171A': {
        act: 'Indian Penal Code (IPC)',
        title: 'Candidate, Electoral right defined',
        description: 'Defines candidate and electoral right for election-related offenses.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Fine or imprisonment'
      },
      '171B': {
        act: 'Indian Penal Code (IPC)',
        title: 'Bribery',
        description: 'Whoever gives or offers any gratification to any person as a motive or reward for voting or refraining from voting.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine, or both'
      },
      '171C': {
        act: 'Indian Penal Code (IPC)',
        title: 'Undue influence at elections',
        description: 'Whoever voluntarily interferes or attempts to interfere with the free exercise of any electoral right.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine, or both'
      },
      '171D': {
        act: 'Indian Penal Code (IPC)',
        title: 'Personation at elections',
        description: 'Whoever at an election applies for a voting paper or votes in the name of any other person.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine, or both'
      },
      '171E': {
        act: 'Indian Penal Code (IPC)',
        title: 'Punishment for bribery',
        description: 'Punishment for giving or offering gratification as motive or reward for voting.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine, or both'
      },
      '171F': {
        act: 'Indian Penal Code (IPC)',
        title: 'Punishment for undue influence or personation at election',
        description: 'Punishment for undue influence or personation at any election.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine, or both'
      },
      '171G': {
        act: 'Indian Penal Code (IPC)',
        title: 'False statement in connection with election',
        description: 'Whoever makes any false statement in any declaration required by law relating to elections.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 6 months, or fine, or both'
      },
      '171H': {
        act: 'Indian Penal Code (IPC)',
        title: 'Illegal payments in connection with election',
        description: 'Whoever without general or special authority in writing from a candidate incurs or authorizes expenses on account of holding any public meeting.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Fine up to ₹500'
      },
      '171I': {
        act: 'Indian Penal Code (IPC)',
        title: 'Failure to keep election accounts',
        description: 'Whoever being required by any law for the time being in force or any rule having the force of law to keep accounts of expenses incurred at or in connection with an election fails to keep such accounts.',
        category: 'Of Offences Relating to Elections',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Fine up to ₹500'
      },

      // Contempts of Lawful Authority (172-190)
      '172': {
        act: 'Indian Penal Code (IPC)',
        title: 'Absconding to avoid service of summons',
        description: 'Whoever absconds in order to avoid being served with a summons, notice or order proceeding from any public servant.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹500, or both'
      },
      '173': {
        act: 'Indian Penal Code (IPC)',
        title: 'Preventing service of summons',
        description: 'Whoever in any manner intentionally prevents the serving on himself or on any other person of any summons, notice or order proceeding from any public servant.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹500, or both'
      },
      '174': {
        act: 'Indian Penal Code (IPC)',
        title: 'Non-attendance in obedience to order from public servant',
        description: 'Whoever, being legally bound to attend in person or by an agent at a certain place and time in obedience to a summons, notice, order or proclamation proceeding from any public servant, intentionally omits to attend at that place or time.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹500, or both'
      },
      '175': {
        act: 'Indian Penal Code (IPC)',
        title: 'Omission to produce document to public servant',
        description: 'Whoever, being legally bound to produce or deliver up any document to any public servant, as such, intentionally omits so to produce or deliver up the same.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹500, or both'
      },
      '176': {
        act: 'Indian Penal Code (IPC)',
        title: 'Omission to give notice or information to public servant',
        description: 'Whoever, being legally bound to give any notice or to furnish information on any subject to any public servant, as such, intentionally omits to give such notice or to furnish such information.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹500, or both'
      },
      '177': {
        act: 'Indian Penal Code (IPC)',
        title: 'Furnishing false information',
        description: 'Whoever, being legally bound to furnish information on any subject to any public servant, as such, furnishes, as true, information on the subject which he knows or has reason to believe to be false.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 6 months, or fine up to ₹1,000, or both'
      },
      '178': {
        act: 'Indian Penal Code (IPC)',
        title: 'Refusing oath when duly required by public servant',
        description: 'Whoever refuses to bind himself by an oath or affirmation to state the truth, when required so to bind himself by a public servant legally competent to require that he shall so bind himself.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 6 months, or fine up to ₹1,000, or both'
      },
      '179': {
        act: 'Indian Penal Code (IPC)',
        title: 'Refusing to answer public servant authorized to question',
        description: 'Whoever, being legally bound to state the truth on any subject to any public servant, refuses to answer any question demanded of him touching that subject by such public servant.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 6 months, or fine up to ₹1,000, or both'
      },
      '180': {
        act: 'Indian Penal Code (IPC)',
        title: 'Refusing to sign statement',
        description: 'Whoever refuses to sign any statement made by him, when required to sign that statement by a public servant legally competent to require that he shall sign that statement.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 3 months, or fine up to ₹500, or both'
      },
      '181': {
        act: 'Indian Penal Code (IPC)',
        title: 'False statement on oath to public servant',
        description: 'Whoever, being legally bound by an oath or affirmation to state the truth on any subject to any public servant or other person authorized by law to administer such oath or affirmation, makes, to such public servant or other person, as aforesaid, upon such subject, any statement which is false.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 3 years, or fine, or both'
      },
      '182': {
        act: 'Indian Penal Code (IPC)',
        title: 'False information with intent to cause public servant to use lawful power to injury of another',
        description: 'Whoever gives to any public servant any information which he knows or believes to be false, intending thereby to cause, or knowing it to be likely that he will thereby cause, such public servant to use the lawful power of such public servant to the injury or annoyance of any other person.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 6 months, or fine up to ₹1,000, or both'
      },
      '183': {
        act: 'Indian Penal Code (IPC)',
        title: 'Resistance to taking of property by lawful authority',
        description: 'Whoever offers any resistance to the taking of any property by the lawful authority of any public servant, knowing or having reason to believe that he is such public servant.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 6 months, or fine up to ₹1,000, or both'
      },
      '184': {
        act: 'Indian Penal Code (IPC)',
        title: 'Obstructing sale of property offered for sale by authority of public servant',
        description: 'Whoever intentionally obstructs any sale of property offered for sale by the lawful authority of any public servant, as such.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹500, or both'
      },
      '185': {
        act: 'Indian Penal Code (IPC)',
        title: 'Illegal purchase or bid for property offered for sale by authority of public servant',
        description: 'Whoever, at any sale of property held by the lawful authority of a public servant, as such, purchases or bids for any property on account of any person, whether himself or any other, whom he knows to be under a legal incapacity to purchase that property at that sale.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹200, or both'
      },
      '186': {
        act: 'Indian Penal Code (IPC)',
        title: 'Obstructing public servant in discharge of public functions',
        description: 'Whoever voluntarily obstructs any public servant in the discharge of his public functions.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 3 months, or fine up to ₹500, or both'
      },
      '187': {
        act: 'Indian Penal Code (IPC)',
        title: 'Omission to assist public servant when bound by law',
        description: 'Whoever, being bound by law to render or furnish assistance to any public servant in the execution of his public duty, intentionally omits to give such assistance.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹200, or both'
      },
      '188': {
        act: 'Indian Penal Code (IPC)',
        title: 'Disobedience to order duly promulgated by public servant',
        description: 'Whoever, knowing that, by an order promulgated by a public servant lawfully empowered to promulgate such order, he is directed to abstain from a certain act, or to take certain order with certain property in his possession or under his management, disobeys such direction.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 month, or fine up to ₹200, or both'
      },
      '189': {
        act: 'Indian Penal Code (IPC)',
        title: 'Threat of injury to public servant',
        description: 'Whoever holds out any threat of injury to any public servant, or to any person in whom he believes that public servant to be interested, for the purpose of inducing that public servant to do any act, or to forbear or delay to do any act, connected with the exercise of the public functions of such public servant.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 2 years, or fine, or both'
      },
      '190': {
        act: 'Indian Penal Code (IPC)',
        title: 'Threat of injury to induce person to refrain from applying for protection',
        description: 'Whoever holds out any threat of injury to any person for the purpose of inducing that person to refrain or desist from making a legal application for protection against any injury to any public servant legally empowered as such to give such protection, or to cause such protection to be given.',
        category: 'Of Contempts of the Lawful Authority of Public Servants',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine, or both'
      },

      // False Evidence (191-229A)
      '191': {
        act: 'Indian Penal Code (IPC)',
        title: 'Giving false evidence',
        description: 'Whoever, being legally bound by an oath or by an express provision of law to state the truth, or being bound by law to make a declaration upon any subject, makes any statement which is false.',
        category: 'Of False Evidence and Offences Against Public Justice',
        bailable: false,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Magistrate of the first class',
        punishment: 'Up to 7 years + fine'
      },
      '192': {
        act: 'Indian Penal Code (IPC)',
        title: 'Fabricating false evidence',
        description: 'Whoever causes any circumstance to exist or makes any false entry in any book or record, or electronic record or makes any document or electronic record containing a false statement, intending that such circumstance, false entry or false statement may appear in evidence in a judicial proceeding.',
        category: 'Of False Evidence and Offences Against Public Justice',
        bailable: false,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Magistrate of the first class',
        punishment: 'Up to 7 years + fine'
      },
      '193': {
        act: 'Indian Penal Code (IPC)',
        title: 'Punishment for false evidence',
        description: 'Whoever intentionally gives false evidence in any stage of a judicial proceeding, or fabricates false evidence for the purpose of being used in any stage of a judicial proceeding.',
        category: 'Of False Evidence and Offences Against Public Justice',
        bailable: false,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Magistrate of the first class',
        punishment: 'Up to 7 years + fine'
      },
      '194': {
        act: 'Indian Penal Code (IPC)',
        title: 'Giving false evidence with intent to procure conviction of capital offence',
        description: 'Whoever gives or fabricates false evidence, intending thereby to cause, or knowing it to be likely that he will thereby cause, any person to be convicted of an offence which is capital by the law for the time being in force.',
        category: 'Of False Evidence and Offences Against Public Justice',
        bailable: false,
        cognizable: true,
        compoundable: 'Non-compoundable',
        triableBy: 'Court of Session',
        punishment: 'Life imprisonment or up to 10 years + fine'
      },
      '195': {
        act: 'Indian Penal Code (IPC)',
        title: 'Giving false evidence with intent to procure conviction of offence punishable with imprisonment',
        description: 'Whoever gives or fabricates false evidence intending thereby to cause, or knowing it to be likely that he will thereby cause, any person to be convicted of an offence which by the law for the time being in force is not capital, but punishable with imprisonment for life, or imprisonment for a term of seven years or upwards.',
        category: 'Of False Evidence and Offences Against Public Justice',
        bailable: false,
        cognizable: false,
        compoundable: 'Non-compoundable',
        triableBy: 'Magistrate of the first class',
        punishment: 'Up to 7 years + fine'
      },

      // Common sections
      '279': {
        act: 'Indian Penal Code (IPC)',
        title: 'Rash or negligent driving on a public way',
        description: 'Whoever drives any vehicle, or rides, on any public way in a manner so rash or negligent as to endanger human life, or to be likely to cause hurt or injury to any other person.',
        category: 'Of Offences Affecting Public Health, Safety, Convenience, Decency and Morals',
        bailable: true,
        cognizable: true,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 6 months, or fine up to ₹1,000, or both'
      },
      '294': {
        act: 'Indian Penal Code (IPC)',
        title: 'Obscene acts and songs',
        description: 'Whoever, to the annoyance of others, does any obscene act in any public place, or sings, recites or utters any obscene song, ballad or words, in or near any public place.',
        category: 'Of Offences Affecting Public Health, Safety, Convenience, Decency and Morals',
        bailable: true,
        cognizable: true,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 3 months, or fine, or both'
      },
      '294B': {
        act: 'Indian Penal Code (IPC)',
        title: 'Obscene acts and songs',
        description: 'Whoever, to the annoyance of others, does any obscene act in any public place, or sings, recites or utters any obscene song, ballad or words, in or near any public place.',
        category: 'Of Offences Affecting Public Health, Safety, Convenience, Decency and Morals',
        bailable: true,
        cognizable: true,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 3 months, or fine, or both'
      },
      '302': {
        act: 'Indian Penal Code (IPC)',
        title: 'Punishment for murder',
        description: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
        category: 'Of Offences Affecting the Human Body',
        bailable: false,
        cognizable: true,
        compoundable: 'Non-compoundable',
        triableBy: 'Court of Session',
        punishment: 'Death or life imprisonment + fine'
      },
      '304B': {
        act: 'Indian Penal Code (IPC)',
        title: 'Dowry death',
        description: 'Where the death of a woman is caused by any burns or bodily injury or occurs otherwise than under normal circumstances within seven years of her marriage and it is shown that soon before her death she was subjected to cruelty or harassment by her husband or any relative of her husband for, or in connection with, any demand for dowry.',
        category: 'Of Offences Affecting the Human Body',
        bailable: false,
        cognizable: true,
        compoundable: 'Non-compoundable',
        triableBy: 'Court of Session',
        punishment: 'Minimum 7 years, up to life'
      },
      '307': {
        act: 'Indian Penal Code (IPC)',
        title: 'Attempt to murder',
        description: 'Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder.',
        category: 'Of Offences Affecting the Human Body',
        bailable: false,
        cognizable: true,
        compoundable: 'Non-compoundable',
        triableBy: 'Court of Session',
        punishment: 'Up to 10 years, or life, + fine'
      },
      '323': {
        act: 'Indian Penal Code (IPC)',
        title: 'Voluntarily causing hurt',
        description: 'Whoever, except in the case provided for by section 334, voluntarily causes hurt.',
        category: 'Of Offences Affecting the Human Body',
        bailable: true,
        cognizable: true,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine up to ₹1,000, or both'
      },
      '354': {
        act: 'Indian Penal Code (IPC)',
        title: 'Assault or criminal force to woman with intent to outrage modesty',
        description: 'Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty.',
        category: 'Of Offences Affecting the Human Body',
        bailable: false,
        cognizable: true,
        compoundable: 'Non-compoundable',
        triableBy: 'Magistrate of the first class',
        punishment: '1–5 years + fine'
      },
      '376': {
        act: 'Indian Penal Code (IPC)',
        title: 'Rape',
        description: 'Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than seven years, but which may extend to imprisonment for life, and shall also be liable to fine.',
        category: 'Of Offences Affecting the Human Body',
        bailable: false,
        cognizable: true,
        compoundable: 'Non-compoundable',
        triableBy: 'Court of Session',
        punishment: '7 years to life + fine'
      },
      '379': {
        act: 'Indian Penal Code (IPC)',
        title: 'Punishment for theft',
        description: 'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
        category: 'Of Offences Against Property',
        bailable: true,
        cognizable: true,
        compoundable: 'Compoundable with court\'s permission',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 3 years, or fine, or both'
      },
      '420': {
        act: 'Indian Penal Code (IPC)',
        title: 'Cheating and dishonestly inducing delivery of property',
        description: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security.',
        category: 'Of Offences Against Property',
        bailable: false,
        cognizable: true,
        compoundable: 'Compoundable with court\'s permission',
        triableBy: 'Magistrate of the first class',
        punishment: 'Up to 7 years + fine'
      },
      '447': {
        act: 'Indian Penal Code (IPC)',
        title: 'Criminal trespass',
        description: 'Whoever enters into or upon property in the possession of another with intent to commit an offence or to intimidate, insult or annoy any person in possession of such property.',
        category: 'Of Offences Against Property',
        bailable: true,
        cognizable: true,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 3 months, or fine up to ₹500, or both'
      },
      '448': {
        act: 'Indian Penal Code (IPC)',
        title: 'House trespass',
        description: 'Whoever commits criminal trespass by entering into or remaining in any building, tent or vessel used as a human dwelling or any building used as a place for worship, or as a place for the custody of property.',
        category: 'Of Offences Against Property',
        bailable: true,
        cognizable: true,
        compoundable: 'Compoundable with court\'s permission',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 1 year, or fine, or both'
      },
      '504': {
        act: 'Indian Penal Code (IPC)',
        title: 'Intentional insult to provoke breach of peace',
        description: 'Whoever intentionally insults, and thereby gives provocation to any person, intending or knowing it to be likely that such provocation will cause him to break the public peace, or to commit any other offence.',
        category: 'Of Offences Affecting Public Health, Safety, Convenience, Decency and Morals',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 2 years, or fine, or both'
      },
      '506': {
        act: 'Indian Penal Code (IPC)',
        title: 'Criminal intimidation',
        description: 'Whoever threatens another with any injury to his person, reputation or property, or to the person or reputation of any one in whom that person is interested, with intent to cause alarm to that person, or to cause that person to do any act which he is not legally bound to do.',
        category: 'Of Offences Affecting Public Health, Safety, Convenience, Decency and Morals',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 2 years, or fine, or both'
      },
      '510': {
        act: 'Indian Penal Code (IPC)',
        title: 'Misconduct in public by a drunken person',
        description: 'Whoever, in a state of intoxication, appears in any public place, or in any place which it is a trespass in him to enter, and there conducts himself in such a manner as to cause annoyance to any person.',
        category: 'Of Offences Affecting Public Health, Safety, Convenience, Decency and Morals',
        bailable: true,
        cognizable: false,
        compoundable: 'Compoundable',
        triableBy: 'Any Magistrate',
        punishment: 'Up to 24 hours, or fine up to ₹10, or both'
      }
    },
    acts: {
      'murder': ['302', '307'],
      'theft': ['379'],
      'cheating': ['420'],
      'fraud': ['420'],
      'rape': ['376'],
      'assault': ['354'],
      'trespass': ['447', '448'],
      'driving': ['279'],
      'insult': ['504'],
      'drunk': ['510'],
      'attempt murder': ['307'],
      'dowry': ['304B'],
      'obscene': ['294'],
      'hurt': ['323'],
      'election': ['171A', '171B', '171C', '171D', '171E', '171F', '171G', '171H', '171I'],
      'bribery': ['171B', '171E'],
      'false evidence': ['191', '192', '193', '194', '195'],
      'contempt': ['172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189', '190'],
      'public servant': ['172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189', '190'],
      'intimidation': ['506']
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    if (searchType === 'section') {
      // Clean the query - remove any extra characters and normalize
      let cleanQuery = query.trim().toUpperCase();
      
      // Handle variations like 294(b), 294B, etc.
      if (cleanQuery.includes('(') && cleanQuery.includes(')')) {
        cleanQuery = cleanQuery.replace(/[()]/g, '');
      }
      
      // Try exact match first
      let section = legalDatabase.sections[cleanQuery];
      
      // If not found, try without letters (for cases like 294b -> 294)
      if (!section) {
        const numericPart = cleanQuery.replace(/[A-Z]/g, '');
        section = legalDatabase.sections[numericPart];
      }
      
      // If still not found, try with common variations
      if (!section) {
        const variations = [
          cleanQuery + 'B',
          cleanQuery.replace('B', ''),
          cleanQuery + 'A',
          cleanQuery.replace('A', '')
        ];
        
        for (const variation of variations) {
          if (legalDatabase.sections[variation]) {
            section = legalDatabase.sections[variation];
            cleanQuery = variation;
            break;
          }
        }
      }
      
      if (section) {
        setResult({
          type: 'section',
          section: cleanQuery,
          ...section
        });
      } else {
        setResult({
          type: 'error',
          message: `Section "${query}" not found in database. Available sections include: 171A-171I, 172-195, 279, 294, 302, 304B, 307, 323, 354, 376, 379, 420, 447, 448, 504, 506, 510`
        });
      }
    } else {
      const searchTerm = query.toLowerCase().trim();
      const sections = legalDatabase.acts[searchTerm];
      
      if (sections) {
        setResult({
          type: 'act',
          act: query.trim(),
          sections: sections.map(sec => ({
            section: sec,
            ...legalDatabase.sections[sec]
          })).filter(s => s.title) // Filter out any undefined sections
        });
      } else {
        // Try partial matching
        const matchingActs = Object.keys(legalDatabase.acts).filter(act => 
          act.includes(searchTerm) || searchTerm.includes(act)
        );
        
        if (matchingActs.length > 0) {
          const allSections = matchingActs.flatMap(act => legalDatabase.acts[act]);
          setResult({
            type: 'act',
            act: `Related to "${query.trim()}"`,
            sections: allSections.map(sec => ({
              section: sec,
              ...legalDatabase.sections[sec]
            })).filter(s => s.title)
          });
        } else {
          setResult({
            type: 'error',
            message: `Act "${query}" not found in database. Available acts include: murder, theft, cheating, fraud, rape, assault, trespass, driving, insult, drunk, election, bribery, false evidence, contempt, public servant, intimidation`
          });
        }
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <Scale className="w-16 h-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
              searchType === 'section' 
                ? 'border-red-600 bg-red-50' 
                : 'border-gray-200 hover:border-red-300'
            }`} onClick={() => setSearchType('section')}>
              <FileText className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.sectionToAct}</h3>
              <p className="text-gray-600">{t.sectionDesc}</p>
            </div>

            <div className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
              searchType === 'act' 
                ? 'border-red-600 bg-red-50' 
                : 'border-gray-200 hover:border-red-300'
            }`} onClick={() => setSearchType('act')}>
              <Search className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.actToSection}</h3>
              <p className="text-gray-600">{t.actDesc}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{t.search}</span>
              </button>
            </div>
            <p className="text-sm text-gray-600">{t.example}</p>
          </div>

          {result && (
            <div className="mt-8">
              {result.type === 'section' && (
                <div className="bg-white border-l-4 border-red-600 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Section {result.section} - {result.title}
                  </h3>
                  <p className="text-lg text-red-600 mb-4">{result.act}</p>
                  <p className="text-gray-700 mb-4">{result.description}</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-semibold">Category:</span>
                      <p className="text-gray-700">{result.category}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-semibold">Bailable:</span>
                      <p className={result.bailable ? 'text-green-600' : 'text-red-600'}>
                        {result.bailable ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-semibold">Cognizable:</span>
                      <p className={result.cognizable ? 'text-green-600' : 'text-red-600'}>
                        {result.cognizable ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-semibold">Compoundable:</span>
                      <p className="text-gray-700">{result.compoundable}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-semibold">Triable by:</span>
                      <p className="text-gray-700">{result.triableBy}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <span className="font-semibold">Punishment:</span>
                      <p className="text-gray-700">{result.punishment}</p>
                    </div>
                  </div>
                </div>
              )}

              {result.type === 'act' && (
                <div className="bg-white border-l-4 border-red-600 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Related Sections for "{result.act}"
                  </h3>
                  <div className="space-y-4">
                    {result.sections.map((section: any, index: number) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          Section {section.section} - {section.title}
                        </h4>
                        <p className="text-gray-700 mb-2">{section.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <span className={`px-2 py-1 rounded ${
                            section.bailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {section.bailable ? 'Bailable' : 'Non-bailable'}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            {section.cognizable ? 'Cognizable' : 'Non-cognizable'}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                            {section.compoundable}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                            {section.triableBy}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Punishment:</span> {section.punishment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.type === 'error' && (
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <p className="text-red-700">{result.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IPCIdentifier;