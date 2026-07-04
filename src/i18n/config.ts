import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Navigation
        nav: {
          home: "Home",
          about: "About",
          experience: "Experience",
          projects: "Projects",
          awards: "Awards",
          socialMedia: "Social Media",
          skills: "Skills",
          contact: "Contact"
        },
        // Hero Section
        hero: {
          name: "Khumoyun Naseeb",
          title: "Mathematics & Economics Student",
          description: "BSc student at HKUST passionate about mathematics, education, and mentorship. Global Learners scholarship recipient with experience in teaching, research, and community leadership.",
          getInTouch: "Get in touch",
          email: "Email",
          linkedin: "LinkedIn",
          location: "Hong Kong",
          year: "HKUST Year 3",
          scholarship: "Full Scholarship"
        },
        // About Section
        about: {
          title: "About Me",
          intro: "Hi, I'm Khumoyun Naseeb, a third-year undergraduate student at the Hong Kong University of Science and Technology (HKUST), majoring in Mathematics and Economics. Originally from Uzbekistan, I am fortunate to be studying on the Global Learners scholarship - a merit-based program that has enabled me to pursue my academic and personal goals at one of Asia's leading universities.",
          education: "Education",
          hkust: "Hong Kong University of Science and Technology",
          hkustDegree: "BSc in Mathematics & Economics | GPA: 3.6",
          hkustPeriod: "Sept 2023 - June 2027 (Expected)",
          hkustScholarship: "Global Learners Scholarship (Full Tuition and Living Expense)",
          vuAmsterdam: "Vrije Universiteit Amsterdam",
          vuAmsterdamDegree: "Spring Semester Exchange",
          vuAmsterdamLocation: "Amsterdam, Netherlands",
          vuAmsterdamPeriod: "January 2026 – Present",
          vinUni: "Vin University Exchange",
          vinUniLocation: "Hanoi, Vietnam",
          vinUniPeriod: "August 2024 - December 2024",
          vinUniScholarship: "Fully Funded",
          honors: "Honors & Awards",
          honor1: "Academic Scholarship (Full Tuition fees)",
          honor1Period: "Spring & Fall 2024"
        },
        // Experience Section
        experience: {
          title: "Work Experience",
          hkustDb: {
            title: "Database Developer",
            company: "HKUST Business School",
            location: "Hong Kong",
            period: "Sep 2025 – Present",
            point1: "Developed and managed an Excel database to automate data processing in the External & Alumni Relations office",
            point2: "Sourced, analyzed, and updated alumni and administrative records for accuracy",
            point3: "Supported database management and data analysis for office projects"
          },
          disney: {
            title: "Intern",
            company: "Walt Disney",
            location: "FL, USA",
            period: "June 2025 – August 2025",
            point1: "Delivering exceptional guest service in a fast paced, multicultural environment, enhancing the overall Disney experience and consistently receiving positive feedback",
            point2: "Collaborated with an international team to support daily operations, demonstrate problem-solving under pressure, and adapt to dynamic guest needs",
            point3: "Participated in professional development workshops focused on leadership, communication, and career advancement"
          },
          aops: {
            title: "Teaching Assistant & Grader",
            company: "Art of Problem Solving Academy (aops.com)",
            location: "(Remote) CA, USA",
            period: "December 2024 – Present",
            point1: "Assisting in live classes weekly for the online intermediate and advanced math olympiad courses for high school students preparing for AMC, AIME, USAMO, IMC, IMO",
            point2: "Grading and providing assignments for 100+ students weekly"
          },
          ministry: {
            title: "Intern at the Department of Small and Medium Businesses",
            company: "Ministry of Finance and Economics of Republic of Uzbekistan",
            location: "Tashkent, Uzbekistan",
            period: "June 2024 - August 2024",
            point1: "Conducted research on MSME sector development in Uzbekistan, analyzing international best practices and proposing tailored recommendations",
            point2: "Produced detailed reports and case studies to support policymaking and sector growth",
            point3: "Collaborated with colleagues, presented findings, and contributed to team discussions with strong analytical insights"
          },
          alpha: {
            title: "Mathematics Teacher",
            company: "Alpha Academy",
            location: "Sirdaryo, Uzbekistan",
            period: "May 2023 - August 2023",
            point1: "Became the first SAT teacher in my region, mentoring students for preparing SAT math part",
            point2: "Taught students in sequences, trigonometry, and combinatorics with personalized guidance",
            point3: "Graded assignments and provided detailed feedback to enhance understanding"
          }
        },
        // Projects Section
        projects: {
          title: "Leadership & Projects",
          naseeb: {
            title: "Founder, Head Mentor | NASEEB EDU",
            period: "April 2024 - Present",
            point1: "Founded and currently leading a mentorship organization that has guided 30+ Uzbek students in securing scholarships and university admissions worldwide.",
            point2: "Provided personalized support in application processes, essay writing, standardized test preparation, and navigating university requirements.",
            point3: "Cultivated a collaborative, supportive environment for ambitious learners from across Uzbekistan."
          },
          samarkand: {
            title: "Co-founder | UzbekUSA Mentorship Program (Samarkand Branch)",
            period: "September 2022 - July 2023",
            point1: "Co-founded and led the first high school mentorship program in Samarkand region, guiding 100+ students in preparation for international university admissions",
            point2: "Delivered guidance on college essays, application materials, and scholarship opportunities",
            point3: "Organized and conducted seminars on SAT preparation to improve student readiness for standardized tests"
          },
          ivyonaire: {
            title: "Co-founder, Head Mentor | IVYONAIRE",
            period: "April 2023 - December 2023",
            point1: "Co-founded and led IVYONAIRE, a mentorship organization dedicated to helping Uzbek high school students pursue higher education abroad",
            point2: "Managed a team of 7 mentors and guided 35+ mentees in securing scholarships and university admissions",
            point3: "Provided personalized coaching in application strategies, college essay writing, and scholarship research"
          }
        },
        // Awards Section
        awards: {
          title: "Awards & Competitions",
          award1: {
            title: "Fermat Math Contest",
            year: "2023",
            desc: "National Top 15% in Uzbekistan"
          },
          award2: {
            title: "Euclid Math Contest",
            year: "2023",
            desc: "National Top 15% in Uzbekistan"
          },
          award3: {
            title: "National Economics Olympiad",
            year: "2023",
            desc: "3rd Place among High School Students"
          }
        },
        // Skills Section
        skills: {
          title: "Skills",
          languages: "Languages",
          english: "English",
          uzbek: "Uzbek",
          russian: "Russian",
          turkish: "Turkish",
          chinese: "Chinese (Beginner)",
          technical: "Technical Skills",
          programming: "Programming",
          tools: "Tools & Technologies",
          soft: "Soft Skills"
        },
        // Social Media Section
        socialMedia: {
          title: "Social Media"
        },
        // Contact Section
        contact: {
          title: "Get in Touch",
          description: "Feel free to reach out for opportunities, collaborations, or just to connect!",
          telegram: "Telegram",
          copyright: "© 2024 Khumoyun Naseeb. All rights reserved."
        }
      }
    },
    uz: {
      translation: {
        nav: {
          home: "Bosh sahifa",
          about: "Men Haqimda",
          experience: "Tajriba",
          projects: "Loyihalar",
          awards: "Mukofotlar",
          socialMedia: "Ijtimoiy Tarmoqlar",
          skills: "Ko'nikmalar",
          contact: "Bog'lanish"
        },
        hero: {
          name: "Xumoyun Naseeb",
          title: "Matematika va Iqtisodiyot Talabasi",
          description: "HKUST da matematika, ta'lim va mentorlikka ishtiyoqli BSc talabasi. Global Learners stipendiyasi egasi, o'qitish, tadqiqot va jamoat liderligida tajribaga ega.",
          getInTouch: "Bog'lanish",
          email: "Email",
          linkedin: "LinkedIn",
          location: "Gonkong",
          year: "HKUST 3-kurs",
          scholarship: "To'liq Stipendiya"
        },
        about: {
          title: "Men Haqimda",
          intro: "Salom, men Xumoyun Naseeb, Gonkong Fan va Texnologiya Universitetida (HKUST) Matematika va Iqtisodiyot yo'nalishida tahsil olayotgan 3-kurs talabasiman. Men O'zbekistondan bo'lib, Global Learners stipendiyasi asosida Osiyoning yetakchi universitetlaridan birida o'qish imkoniyatiga ega bo'ldim.",
          education: "Ta'lim",
          hkust: "Gonkong Fan va Texnologiya Universiteti",
          hkustDegree: "BSc Matematika va Iqtisodiyot | GPA: 3.6",
          hkustPeriod: "2023-yil Sentabr - 2027-yil Iyun (Kutilmoqda)",
          hkustScholarship: "Global Learners Stipendiyasi (To'liq o'quv va yashash xarajatlari)",
          vuAmsterdam: "Vrije Universiteit Amsterdam",
          vuAmsterdamDegree: "Bahorgi Semestr Almashinuvi",
          vuAmsterdamLocation: "Amsterdam, Niderlandiya",
          vuAmsterdamPeriod: "2026-yil Yanvar – Hozir",
          vinUni: "Vin Universiteti Almashinuvi",
          vinUniLocation: "Xanoy, Vyetnam",
          vinUniPeriod: "2024-yil Avgust - 2024-yil Dekabr",
          vinUniScholarship: "To'liq moliyalashtirilgan",
          honors: "Mukofotlar va Yutuqlar",
          honor1: "Akademik Stipendiya (To'liq o'quv to'lovi)",
          honor1Period: "2024-yil Bahor va Kuz"
        },
        experience: {
          title: "Ish Tajribasi",
          hkustDb: {
            title: "Ma'lumotlar Bazasi Dasturchisi",
            company: "HKUST Biznes Maktabi",
            location: "Gonkong",
            period: "2025-yil Sen – Hozir",
            point1: "Tashqi va bitiruvchilar bilan aloqalar ofisida ma'lumotlarni qayta ishlashni avtomatlashtirish uchun Excel ma'lumotlar bazasini ishlab chiqdim va boshqardim",
            point2: "Bitiruvchilar va ma'muriy yozuvlarni aniqlik uchun topish, tahlil qilish va yangilash",
            point3: "Ofis loyihalari uchun ma'lumotlar bazasini boshqarish va ma'lumotlarni tahlil qilishni qo'llab-quvvatlash"
          },
          disney: {
            title: "Stajoyor",
            company: "Walt Disney",
            location: "FL, AQSH",
            period: "2025-yil Iyun – 2025-yil Avgust",
            point1: "Tez sur'atli, ko'p madaniyatli muhitda ajoyib mehmon xizmatini taqdim etish, Disney tajribasini yaxshilash va doimiy ravishda ijobiy fikr-mulohazalar olish",
            point2: "Kundalik operatsiyalarni qo'llab-quvvatlash, bosim ostida muammolarni hal qilish va dinamik mehmon ehtiyojlariga moslashish uchun xalqaro jamoa bilan hamkorlik qilish",
            point3: "Liderlik, muloqot va martaba rivojlanishiga qaratilgan professional rivojlanish seminarlarida ishtirok etish"
          },
          aops: {
            title: "O'qituvchi Yordamchisi va Baholovchi",
            company: "Art of Problem Solving Academy (aops.com)",
            location: "(Masofaviy) CA, AQSH",
            period: "2024-yil Dekabr – Hozir",
            point1: "AMC, AIME, USAMO, IMC, IMO ga tayyorgarlik ko'rayotgan o'rta maktab o'quvchilari uchun onlayn o'rta va ilg'or matematik olimpiada kurslarida haftalik jonli darslarda yordam berish",
            point2: "Har hafta 100+ talabaga topshiriqlarni baholash va berish"
          },
          ministry: {
            title: "Kichik va O'rta Biznes Departamentida Stajoyor",
            company: "O'zbekiston Respublikasi Moliya va Iqtisodiyot Vazirligi",
            location: "Toshkent, O'zbekiston",
            period: "2024-yil Iyun - 2024-yil Avgust",
            point1: "O'zbekistonda MMKI sektori rivojlanishi bo'yicha tadqiqot olib borish, xalqaro eng yaxshi amaliyotlarni tahlil qilish va moslashtirilgan tavsiyalar berish",
            point2: "Siyosatni ishlab chiqish va sektor o'sishini qo'llab-quvvatlash uchun batafsil hisobotlar va amaliy tadqiqotlar tayyorlash",
            point3: "Hamkasblar bilan hamkorlik qilish, topilmalarni taqdim etish va kuchli tahliliy tushunchalar bilan jamoa muhokamalariga hissa qo'shish"
          },
          alpha: {
            title: "Matematika O'qituvchisi",
            company: "Alpha Academy",
            location: "Sirdaryo, O'zbekiston",
            period: "2023-yil May - 2023-yil Avgust",
            point1: "Mintaqamda birinchi SAT o'qituvchisi bo'ldim, talabalarni SAT matematika qismiga tayyorlashda maslahat berdim",
            point2: "Talabalarga ketma-ketliklar, trigonometriya va kombinatorika fanlarini shaxsiy yo'riqnoma bilan o'rgatdim",
            point3: "Topshiriqlarni baholadim va tushunishni yaxshilash uchun batafsil fikr-mulohazalar berdim"
          }
        },
        projects: {
          title: "Liderlik va Loyihalar",
          naseeb: {
            title: "Asoschisi, Bosh Mentor | NASEEB EDU",
            period: "2024-yil Aprel - Hozir",
            point1: "30+ o'zbek talabalariga stipendiyalar va dunyo bo'ylab universitetlarga qabul qilinishda yordam bergan mentorlik tashkilotini asoschisi va rahbari.",
            point2: "Ariza jarayonlari, insho yozish, standartlashtirilgan test tayyorlash va universitet talablarini o'rganishda shaxsiy yordam ko'rsatish.",
            point3: "O'zbekistonning barcha burchaklaridan kelgan ambitsiyali o'quvchilar uchun hamkorlikdagi va qo'llab-quvvatlovchi muhit yaratish."
          },
          samarkand: {
            title: "Hammuassis | UzbekUSA Mentorlik Dasturi (Samarqand Filiali)",
            period: "2022-yil Sentabr - 2023-yil Iyul",
            point1: "Samarqand viloyatida birinchi o'rta maktab mentorlik dasturini asos solish va 100+ talabalarni xalqaro universitetlarga qabul qilinishga tayyorlash",
            point2: "Kollej insholari, ariza materiallari va stipendiya imkoniyatlari bo'yicha yo'l-yo'riq ko'rsatish",
            point3: "Standartlashtirilgan testlarga talabalarning tayyorgarligini oshirish uchun SAT tayyorlash seminarlarini tashkil qilish va o'tkazish"
          },
          ivyonaire: {
            title: "Hammuassis, Bosh Mentor | IVYONAIRE",
            period: "2023-yil Aprel - 2023-yil Dekabr",
            point1: "O'zbek o'rta maktab o'quvchilariga chet elda oliy ta'lim olishga yordam berishga bag'ishlangan IVYONAIRE mentorlik tashkilotini asos soldim va rahbarlik qildim",
            point2: "7 mentordan iborat jamoani boshqardim va 35+ menteega stipendiyalar va universitetlarga qabul qilinishda yordam berdim",
            point3: "Ariza strategiyalari, kollej insholari yozish va stipendiyalarni izlashda shaxsiy coaching taqdim etdim"
          }
        },
        awards: {
          title: "Mukofotlar va Tanlovlar",
          award1: {
            title: "Fermat Matematika Tanlov",
            year: "2023",
            desc: "O'zbekistonda Milliy Eng Yaxshi 15%"
          },
          award2: {
            title: "Evklid Matematika Tanlov",
            year: "2023",
            desc: "O'zbekistonda Milliy Eng Yaxshi 15%"
          },
          award3: {
            title: "Milliy Iqtisodiyot Olimpiadasi",
            year: "2023",
            desc: "O'rta Maktab O'quvchilari Orasida 3-o'rin"
          }
        },
        skills: {
          title: "Ko'nikmalar",
          languages: "Tillar",
          english: "Ingliz tili",
          uzbek: "O'zbek tili",
          russian: "Rus tili",
          turkish: "Turk tili",
          chinese: "Xitoy tili (Boshlang'ich)",
          technical: "Texnik Ko'nikmalar",
          programming: "Dasturlash",
          tools: "Vositalar va Texnologiyalar",
          soft: "Yumshoq Ko'nikmalar"
        },
        socialMedia: {
          title: "Ijtimoiy Tarmoqlar"
        },
        contact: {
          title: "Bog'laning",
          description: "Imkoniyatlar, hamkorlik yoki shunchaki bog'lanish uchun bemalol murojaat qiling!",
          telegram: "Telegram",
          copyright: "© 2024 Xumoyun Naseeb. Barcha huquqlar himoyalangan."
        }
      }
    },
    ru: {
      translation: {
        nav: {
          home: "Главная",
          about: "Обо мне",
          experience: "Опыт",
          projects: "Проекты",
          awards: "Награды",
          socialMedia: "Социальные сети",
          skills: "Навыки",
          contact: "Контакты"
        },
        hero: {
          name: "Хумоюн Насиб",
          title: "Студент математики и экономики",
          description: "Студент бакалавриата HKUST, увлеченный математикой, образованием и наставничеством. Получатель стипендии Global Learners с опытом преподавания, исследований и общественного лидерства.",
          getInTouch: "Связаться",
          email: "Эл. почта",
          linkedin: "LinkedIn",
          location: "Гонконг",
          year: "HKUST 3 курс",
          scholarship: "Полная стипендия"
        },
        about: {
          title: "Обо мне",
          intro: "Здравствуйте, я Хумоюн Насиб, студент третьего курса Гонконгского университета науки и технологии (HKUST), специализирующийся на математике и экономике. Родом из Узбекистана, я имею возможность учиться по стипендии Global Learners - программе, основанной на заслугах, которая позволила мне достичь своих академических и личных целей в одном из ведущих университетов Азии.",
          education: "Образование",
          hkust: "Гонконгский университет науки и технологии",
          hkustDegree: "Бакалавр математики и экономики | Средний балл: 3.6",
          hkustPeriod: "Сентябрь 2023 - Июнь 2027 (Ожидается)",
          hkustScholarship: "Стипендия Global Learners (Полная оплата обучения и проживания)",
          vuAmsterdam: "Vrije Universiteit Amsterdam",
          vuAmsterdamDegree: "Весенний семестр обмена",
          vuAmsterdamLocation: "Амстердам, Нидерланды",
          vuAmsterdamPeriod: "Январь 2026 – Настоящее время",
          vinUni: "Обмен в университете Вин",
          vinUniLocation: "Ханой, Вьетнам",
          vinUniPeriod: "Август 2024 - Декабрь 2024",
          vinUniScholarship: "Полное финансирование",
          honors: "Награды и достижения",
          honor1: "Академическая стипендия (Полная оплата обучения)",
          honor1Period: "Весна и осень 2024"
        },
        experience: {
          title: "Опыт работы",
          hkustDb: {
            title: "Разработчик баз данных",
            company: "Бизнес-школа HKUST",
            location: "Гонконг",
            period: "Сен 2025 – Настоящее время",
            point1: "Разработал и управлял базой данных Excel для автоматизации обработки данных в офисе внешних связей и связей с выпускниками",
            point2: "Поиск, анализ и обновление записей выпускников и административных данных для обеспечения точности",
            point3: "Поддержка управления базами данных и анализа данных для офисных проектов"
          },
          disney: {
            title: "Стажер",
            company: "Walt Disney",
            location: "FL, США",
            period: "Июнь 2025 – Август 2025",
            point1: "Предоставление исключительного обслуживания гостей в быстром темпе, мультикультурной среде, улучшение общего опыта Disney и постоянное получение положительных отзывов",
            point2: "Сотрудничество с международной командой для поддержки ежедневных операций, демонстрация решения проблем под давлением и адаптация к динамичным потребностям гостей",
            point3: "Участие в семинарах по профессиональному развитию, ориентированных на лидерство, коммуникацию и карьерный рост"
          },
          aops: {
            title: "Ассистент преподавателя и оценщик",
            company: "Art of Problem Solving Academy (aops.com)",
            location: "(Удаленно) CA, США",
            period: "Декабрь 2024 – Настоящее время",
            point1: "Помощь в еженедельных онлайн-занятиях для промежуточных и продвинутых курсов математических олимпиад для старшеклассников, готовящихся к AMC, AIME, USAMO, IMC, IMO",
            point2: "Оценка и предоставление заданий для 100+ студентов еженедельно"
          },
          ministry: {
            title: "Стажер в Департаменте малого и среднего бизнеса",
            company: "Министерство финансов и экономики Республики Узбекистан",
            location: "Ташкент, Узбекистан",
            period: "Июнь 2024 - Август 2024",
            point1: "Проведение исследований по развитию сектора ММСП в Узбекистане, анализ международной лучшей практики и предложение адаптированных рекомендаций",
            point2: "Подготовка подробных отчетов и тематических исследований для поддержки разработки политики и роста сектора",
            point3: "Сотрудничество с коллегами, представление результатов и вклад в обсуждения команды с сильными аналитическими идеями"
          },
          alpha: {
            title: "Учитель математики",
            company: "Alpha Academy",
            location: "Сырдарья, Узбекистан",
            period: "Май 2023 - Август 2023",
            point1: "Стал первым учителем SAT в моем регионе, наставляя студентов в подготовке к математической части SAT",
            point2: "Обучал студентов последовательностям, тригонометрии и комбинаторике с персонализированным руководством",
            point3: "Оценивал задания и предоставлял подробные отзывы для улучшения понимания"
          }
        },
        projects: {
          title: "Лидерство и проекты",
          naseeb: {
            title: "Основатель, Главный наставник | NASEEB EDU",
            period: "Апрель 2024 - Настоящее время",
            point1: "Основал и в настоящее время руковожу организацией наставничества, которая помогла 30+ узбекским студентам получить стипендии и поступить в университеты по всему миру.",
            point2: "Предоставил персонализированную поддержку в процессах подачи заявок, написании эссе, подготовке к стандартизированным тестам и навигации по требованиям университетов.",
            point3: "Создал совместную, поддерживающую среду для амбициозных учащихся со всего Узбекистана."
          },
          samarkand: {
            title: "Соучредитель | Программа наставничества UzbekUSA (Самаркандский филиал)",
            period: "Сентябрь 2022 - Июль 2023",
            point1: "Соучредил и возглавил первую программу наставничества в средней школе в Самаркандской области, направляя 100+ студентов в подготовке к поступлению в международные университеты",
            point2: "Предоставил руководство по эссе для колледжа, материалам для подачи заявок и возможностям получения стипендий",
            point3: "Организовал и провел семинары по подготовке к SAT для улучшения готовности студентов к стандартизированным тестам"
          },
          ivyonaire: {
            title: "Соучредитель, Главный наставник | IVYONAIRE",
            period: "Апрель 2023 - Декабрь 2023",
            point1: "Соучредил и возглавил IVYONAIRE, организацию наставничества, посвященную помощи узбекским старшеклассникам в получении высшего образования за рубежом",
            point2: "Управлял командой из 7 наставников и направлял 35+ подопечных в получении стипендий и поступлении в университеты",
            point3: "Предоставлял персонализированный коучинг по стратегиям подачи заявок, написанию эссе для колледжа и исследованию стипендий"
          }
        },
        awards: {
          title: "Награды и конкурсы",
          award1: {
            title: "Математический конкурс Ферма",
            year: "2023",
            desc: "Национальный топ 15% в Узбекистане"
          },
          award2: {
            title: "Математический конкурс Евклида",
            year: "2023",
            desc: "Национальный топ 15% в Узбекистане"
          },
          award3: {
            title: "Национальная олимпиада по экономике",
            year: "2023",
            desc: "3-е место среди старшеклассников"
          }
        },
        skills: {
          title: "Навыки",
          languages: "Языки",
          english: "Английский",
          uzbek: "Узбекский",
          russian: "Русский",
          turkish: "Турецкий",
          chinese: "Китайский (Начальный)",
          technical: "Технические навыки",
          programming: "Программирование",
          tools: "Инструменты и технологии",
          soft: "Мягкие навыки"
        },
        socialMedia: {
          title: "Социальные сети"
        },
        contact: {
          title: "Свяжитесь со мной",
          description: "Не стесняйтесь обращаться по поводу возможностей, сотрудничества или просто для связи!",
          telegram: "Telegram",
          copyright: "© 2024 Хумоюн Насиб. Все права защищены."
        }
      }
    },
    zh: {
      translation: {
        nav: {
          home: "首页",
          about: "关于我",
          experience: "经历",
          projects: "项目",
          awards: "奖项",
          socialMedia: "社交媒体",
          skills: "技能",
          contact: "联系方式"
        },
        hero: {
          name: "胡莫云·纳西布",
          title: "数学与经济学学生",
          description: "香港科技大学理学士学生，热衷于数学、教育和指导。Global Learners奖学金获得者，在教学、研究和社区领导方面拥有丰富经验。",
          getInTouch: "联系我",
          email: "电子邮件",
          linkedin: "领英",
          location: "香港",
          year: "香港科技大学三年级",
          scholarship: "全额奖学金"
        },
        about: {
          title: "关于我",
          intro: "您好，我是胡莫云·纳西布，香港科技大学（HKUST）数学与经济学专业三年级本科生。我来自乌兹别克斯坦，很荣幸能够获得Global Learners奖学金——这是一个基于学术成绩的项目，使我能够在亚洲领先的大学之一追求我的学术和个人目标。",
          education: "教育背景",
          hkust: "香港科技大学",
          hkustDegree: "数学与经济学理学士 | GPA: 3.6",
          hkustPeriod: "2023年9月 - 2027年6月（预期）",
          hkustScholarship: "Global Learners奖学金（全额学费和生活费）",
          vuAmsterdam: "Vrije Universiteit Amsterdam",
          vuAmsterdamDegree: "春季学期交换",
          vuAmsterdamLocation: "阿姆斯特丹，荷兰",
          vuAmsterdamPeriod: "2026年1月 – 至今",
          vinUni: "Vin大学交换",
          vinUniLocation: "河内，越南",
          vinUniPeriod: "2024年8月 - 2024年12月",
          vinUniScholarship: "全额资助",
          honors: "荣誉与奖项",
          honor1: "学术奖学金（全额学费）",
          honor1Period: "2024年春季和秋季"
        },
        experience: {
          title: "工作经历",
          hkustDb: {
            title: "数据库开发员",
            company: "香港科技大学商学院",
            location: "香港",
            period: "2025年9月 – 至今",
            point1: "开发和管理Excel数据库，以自动化外部与校友关系办公室的数据处理",
            point2: "搜索、分析和更新校友和行政记录以确保准确性",
            point3: "支持办公室项目的数据库管理和数据分析"
          },
          disney: {
            title: "实习生",
            company: "华特迪士尼",
            location: "佛罗里达州，美国",
            period: "2025年6月 – 2025年8月",
            point1: "在快节奏、多元文化的环境中提供卓越的客户服务，增强整体迪士尼体验并持续获得积极反馈",
            point2: "与国际团队合作支持日常运营，展示在压力下解决问题的能力，并适应动态的客户需求",
            point3: "参加专注于领导力、沟通和职业发展的专业发展研讨会"
          },
          aops: {
            title: "助教和评分员",
            company: "Art of Problem Solving Academy (aops.com)",
            location: "（远程）加利福尼亚州，美国",
            period: "2024年12月 – 至今",
            point1: "每周协助在线中级和高级数学奥林匹克课程的直播课程，为准备AMC、AIME、USAMO、IMC、IMO的高中生提供帮助",
            point2: "每周为100多名学生评分和提供作业"
          },
          ministry: {
            title: "中小企业部实习生",
            company: "乌兹别克斯坦共和国财政和经济部",
            location: "塔什干，乌兹别克斯坦",
            period: "2024年6月 - 2024年8月",
            point1: "对乌兹别克斯坦的中小微企业部门发展进行研究，分析国际最佳实践并提出量身定制的建议",
            point2: "制作详细的报告和案例研究以支持政策制定和部门增长",
            point3: "与同事合作，展示研究结果，并以强大的分析见解为团队讨论做出贡献"
          },
          alpha: {
            title: "数学教师",
            company: "Alpha Academy",
            location: "锡尔河州，乌兹别克斯坦",
            period: "2023年5月 - 2023年8月",
            point1: "成为我所在地区的第一位SAT教师，指导学生准备SAT数学部分",
            point2: "以个性化指导教授学生序列、三角学和组合学",
            point3: "评分作业并提供详细反馈以增强理解"
          }
        },
        projects: {
          title: "领导力与项目",
          naseeb: {
            title: "创始人，首席导师 | NASEEB EDU",
            period: "2024年4月 - 至今",
            point1: "创立并目前领导一个指导组织，已帮助30多名乌兹别克学生在全球范围内获得奖学金和大学录取。",
            point2: "在申请流程、论文写作、标准化考试准备和了解大学要求方面提供个性化支持。",
            point3: "为来自乌兹别克斯坦各地的雄心勃勃的学习者培养了协作和支持性的环境。"
          },
          samarkand: {
            title: "联合创始人 | UzbekUSA指导计划（撒马尔罕分部）",
            period: "2022年9月 - 2023年7月",
            point1: "共同创立并领导撒马尔罕地区第一个高中指导计划，指导100多名学生准备国际大学录取",
            point2: "提供关于大学论文、申请材料和奖学金机会的指导",
            point3: "组织和进行SAT准备研讨会，以提高学生对标准化考试的准备程度"
          },
          ivyonaire: {
            title: "联合创始人，首席导师 | IVYONAIRE",
            period: "2023年4月 - 2023年12月",
            point1: "共同创立并领导IVYONAIRE，这是一个致力于帮助乌兹别克高中生出国接受高等教育的指导组织",
            point2: "管理一个由7名导师组成的团队，并指导35多名学员获得奖学金和大学录取",
            point3: "提供关于申请策略、大学论文写作和奖学金研究的个性化辅导"
          }
        },
        awards: {
          title: "奖项与竞赛",
          award1: {
            title: "费马数学竞赛",
            year: "2023",
            desc: "乌兹别克斯坦全国前15%"
          },
          award2: {
            title: "欧几里得数学竞赛",
            year: "2023",
            desc: "乌兹别克斯坦全国前15%"
          },
          award3: {
            title: "全国经济学奥林匹克竞赛",
            year: "2023",
            desc: "高中生中第3名"
          }
        },
        skills: {
          title: "技能",
          languages: "语言",
          english: "英语",
          uzbek: "乌兹别克语",
          russian: "俄语",
          turkish: "土耳其语",
          chinese: "中文（初级）",
          technical: "技术技能",
          programming: "编程",
          tools: "工具与技术",
          soft: "软技能"
        },
        socialMedia: {
          title: "社交媒体"
        },
        contact: {
          title: "联系我",
          description: "欢迎就机会、合作或只是联系而联系我！",
          telegram: "Telegram",
          copyright: "© 2024 胡莫云·纳西布。保留所有权利。"
        }
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
