import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  MessageSquare, 
  Ban, 
  Crown, 
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  Info
} from 'lucide-react';

interface Rule {
  id: string;
  text: string;
  punishment: string;
  note?: string;
}

interface Section {
  title: string;
  icon: React.ReactNode;
  rules: Rule[];
}

const RULES_DATA: Section[] = [
  {
    title: 'Правила Чата',
    icon: <MessageSquare className="w-6 h-6" />,
    rules: [
      {
        id: '2.1',
        text: 'Запрещён флуд/повторение сообщений, символов.',
        punishment: 'мут на 30 минут',
        note: 'За спам/флуд в локальный чат / глобальный / личные сообщения - сотрудник вправе выдать наказание. Продублированное сообщение более 3 раз с одинаковой смысловой нагрузкой. Флуд символами считается от 7 символов и выше.'
      },
      {
        id: '2.2',
        text: 'Запрещено использовать CAPS в более 50% своего сообщения.',
        punishment: 'мут на 30 минут',
        note: 'Относится к словам свыше 6-и символов, либо к предложениям, которые состоят из 2-х и более слов.'
      },
      {
        id: '2.3',
        text: 'Запрещена организация флуда.',
        punishment: 'мут на 30 минут',
      },
      {
        id: '2.4',
        text: 'Запрещено попрошайничество у игроков/модерации/администрации.',
        punishment: 'мут на 60 минут',
        note: 'Не стоит попрошайничать у кого-либо, Вы только засоряете им чат.'
      },
      {
        id: '2.5',
        text: 'Запрещены оскорбления/унижения к кому-либо в любой форме.',
        punishment: 'мут 60 минут',
        note: 'За оскорбление в локальный чат / глобальный / личные сообщения - сотрудник вправе выдать наказание. Завуалированные оскорбления также считаются нарушением; За слова: "Лёгкий, Ez, Нуб, 0, школьник" наказание не выдаётся.'
      },
      {
        id: '2.6',
        text: 'Запрещены оскорбления/унижения/упоминания родных.',
        punishment: 'мут на 180 минут',
        note: 'Оскорбление родных, считается как оскорбление в сторону игрока. Это крайне низкий поступок, за который игрока накажет администрация/модерация проекта.'
      },
      {
        id: '2.7',
        text: 'Запрещена пропаганда или агитация, возбуждающая социальную, расовую, национальную или религиозную ненависть и вражду.',
        punishment: 'мут на 120 минут',
        note: 'При повторе - Блокировка аккаунта на 1 день.'
      },
      {
        id: '2.8',
        text: 'Запрещено рекламировать соц.сети TWITCH/VK/YouTube и т.д , не имея статуса YT.',
        punishment: 'мут на 120 минут',
        note: 'При повторе - Блокировка аккаунта на 7 дней.'
      },
    ]
  },
  {
    title: 'Блокировка Аккаунта',
    icon: <Ban className="w-6 h-6" />,
    rules: [
      {
        id: '3.2',
        text: 'Использование/Хранение сторонних ПО: (Читов/Макросов/Модов, дающих преимущество в игре), Троллинг во время проверки, Выход во время проверки на читы, Отказ от проверки на читы, Оскорбления на проверке',
        punishment: 'бан на 30 дней по IP',
        note: 'Хранение, удаление менее 20-ти дней назад, использование запрещённых программ.'
      },
      {
        id: '3.2.1',
        text: 'Признание в запрещённом ПО',
        punishment: 'бан на 20 дней',
        note: 'Если вы пишите в глобал/локал/лс "я читер" и т.д, это расценивается как признание.'
      },
      {
        id: '3.3',
        text: 'Тим с читером',
        punishment: 'бан на 10 дней по IP',
      },
      {
        id: '3.4',
        text: 'Использование недоработок сервера/Дюпов/багов.',
        punishment: 'бан на 7 дней',
        note: 'Багоюз киркой также карается баном.'
      },
      {
        id: '3.5',
        text: 'Реклама сторонних проектов/Магазинов/ПО/Ютуберов',
        punishment: 'бан на 30 дней по IP',
        note: 'Скрытая, на табличках, на название мобов и так далее, будет является - рекламой.'
      },
      {
        id: '3.6',
        text: 'Оскорбление сервера',
        punishment: 'бан на 12 часов',
        note: 'Завуалированные оскорбления также считаются нарушением пункта.'
      },
      {
        id: '3.7',
        text: 'Попытка взлома аккаунта.',
        punishment: 'бан на 90 дней по IP',
        note: 'Попытка узнать пароль или иные данные для входа в аккаунт.'
      },
      {
        id: '3.8',
        text: 'Передача/Попытка передачи аккаунта 3-им лицам.',
        punishment: 'бан на 14 дней',
        note: 'Данное правило действует, если игрок зайдет с другого IP адреса, а не с одного устройства/IP.'
      },
      {
        id: '3.9',
        text: 'Операция с реальными деньгами',
        punishment: 'бан на 30 дней',
        note: 'Попытка/Продажа виртуальных рублей, вещей и других предметов.'
      },
      {
        id: '3.10',
        text: 'Запрещённы любые виды трапок',
        punishment: 'бан на 3 дня',
      },
      {
        id: '3.11',
        text: 'Постройка/использование/распространение уязвимостей сервера, независимо от их реализуемости и практичности.',
        punishment: 'бан навсегда по IP',
        note: 'Постройки данного типа считаются некорректными и требуют сноса.'
      },
      {
        id: '3.12',
        text: 'Постройка, не соответствующая нравственным нормам (флаги стран, свастики, половые органы и т.д).',
        punishment: '1 день',
        note: 'Постройки данного типа считаются некорректными и требуют сноса.'
      },
      {
        id: '3.13',
        text: 'Обход мута через /bc, /ad',
        punishment: 'бан на 6 часов',
        note: 'Запрещено писать в чат через /bc, /ad, когда на вас наложен мут'
      },
      {
        id: '3.13.1',
        text: 'Обход мута с помощью второго аккаунта',
        punishment: 'бан на 8 часов',
      },
    ]
  },
  {
    title: 'Правила Донатеров',
    icon: <Crown className="w-6 h-6" />,
    rules: [
      {
        id: '4.2',
        text: 'Выдача бана/мута без доказательств.',
        punishment: 'бан на 7 дней',
        note: 'Администратор в праве потребовать доказательства о муте/бане. При отсутствии доказательств выдается наказание.'
      },
      {
        id: '4.3',
        text: 'Выдача Бана/Мута с некорректной причиной.',
        punishment: 'бан на 7 дней',
        note: 'Каждое доказательство должно быть правильно оформлено. При выдачи Банов/Мутов, требуется указывать пункт или причину наказания.'
      },
      {
        id: '4.4',
        text: 'Запрещено использование команд не по назначению.',
        punishment: 'бан на 7 дней',
      },
    ]
  },
  {
    title: 'Администрация и Модерация',
    icon: <UserCheck className="w-6 h-6" />,
    rules: [
      {
        id: '5.1',
        text: 'Оскорбление/унижение администрации.',
        punishment: 'бан на 1 день',
        note: 'За любое оскорбление/унижение в локальный чат / глобальный / личные сообщения- Сотрудник вправе Вас заблокировать, если посчитает нужным. Завуалированные оскорбления так же считаются нарушением пункта.'
      },
      {
        id: '5.2',
        text: 'Ввод администрации в заблуждение.',
        punishment: 'бан на 5 дней',
        note: 'Даже при попытке обмана сотрудника в соц.сетях влечёт за собой наказание на сервере.'
      },
      {
        id: '5.3',
        text: 'Выдача себя за администрацию.',
        punishment: 'бан на 2 дня',
        note: 'Игрока могут привлечь за данный пункт, даже если игрок является сотрудником другого проекта.'
      },
      {
        id: '5.4',
        text: 'Любая помеха в работе администрации/модерации.',
        punishment: 'бан на 12 часов',
        note: 'Перед выдачей наказания сотрудник обязан предупредить Вас, к примеру покинуть территорию в которой введётся работа администрации/модерации. В случае, если Вы откажетесь покидать территорию или проигнорируете его, Вы будете привлечены к данному пункту наказания.'
      },
    ]
  },
];

const RuleCard = ({ rule }: { rule: Rule }) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="bg-slate-800 text-slate-400 font-mono text-xs px-2 py-1 rounded border border-slate-700 shrink-0 mt-1">
          {rule.id}
        </div>
        <div className="flex-1 space-y-3">
          <p className="text-slate-200 text-lg leading-relaxed">
            {rule.text}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-400">Наказание:</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 animate-gradient-x">
              {rule.punishment}
            </span>
          </div>

          {rule.note && (
            <div className="pt-2">
              <button 
                onClick={() => setIsNoteOpen(!isNoteOpen)}
                className="flex items-center gap-1 text-red-500 font-medium text-sm hover:text-red-400 transition-colors group/note"
              >
                <Info className="w-4 h-4" />
                <span>Примечание</span>
                {isNoteOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {isNoteOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 p-3 bg-red-950/20 border-l-2 border-red-500 text-red-200/80 text-sm italic rounded-r-lg leading-relaxed">
                      {rule.note}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const RuleSection = ({ section }: { section: Section }) => {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/30">
          {section.icon}
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {section.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {section.rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <header className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-sm mb-6"
          >
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <span>Официальный свод правил проекта</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            HardlyWorld <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Анархия</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Соблюдение правил обеспечивает комфортную игру для всех участников сервера. 
            Пожалуйста, ознакомьтесь с ними внимательно.
          </motion.p>
        </header>

        {/* Warning Text */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-px rounded-2xl overflow-hidden group"
          >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-gradient-x" />
            
            {/* Inner Content */}
            <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-[15px] p-6 text-center">
              <motion.p 
                className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-600 to-red-400 animate-gradient-x"
                style={{ backgroundSize: '200% 200%' }}
              >
                Данный свод правил может быть изменен в любой момент, и администрация оставляет за собой право не оповещать игроков об изменениях.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Rules Content */}
        <main className="space-y-20">
          {RULES_DATA.map((section, idx) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <RuleSection section={section} />
            </motion.div>
          ))}
        </main>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-slate-800 text-center text-slate-500 text-sm">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a>
            <a href="https://vk.ru/hardly_world_anarchy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">VK Group</a>
            <a href="https://hardlyworld.fun/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Магазин</a>
          </div>
          <p>© {new Date().getFullYear()} HardlyWorld - Minecraft Anarchy Server. Все права защищены.</p>
        </footer>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
