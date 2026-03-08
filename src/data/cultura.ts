export interface ArtigoCultura {
  slug: string
  titulo: string
  subtitulo: string
  emoji: string
  cor: string
  corClara: string
  resumo: string
  tempoLeitura: string
  paragrafos: { subtitulo?: string; texto: string }[]
}

export const ARTIGOS_CULTURA: ArtigoCultura[] = [
  {
    slug: 'rituais-tradicionais',
    titulo: 'Rituais Tradicionais',
    subtitulo: 'Sabedoria ancestral que atravessa gerações',
    emoji: '🔥',
    cor: '#e2715a',
    corClara: '#fdf0ed',
    resumo: 'Os rituais tradicionais são a espinha dorsal das culturas afro-brasileira, indígena e europeia. Muito mais do que cerimônias, são tecnologias de cuidado, memória e pertencimento.',
    tempoLeitura: '5 min',
    paragrafos: [
      {
        texto: 'Um ritual é uma porta. Do lado de cá, o cotidiano. Do lado de lá, o sagrado, o coletivo, o tempo que não passa. Nas culturas originárias do Brasil, África e Europa, os rituais não eram separados da vida — eles eram a própria vida organizada com intenção.',
      },
      {
        subtitulo: 'O que é um ritual?',
        texto: 'Rituais são ações repetidas com significado compartilhado. Podem ser simples: acender uma vela, bater palmas três vezes, girar em sentido horário, chamar pelo nome dos ancestrais. O poder de um ritual está menos na ação em si e mais no que ela carrega — história, pertencimento e intenção coletiva.',
      },
      {
        subtitulo: 'Rituais afro-brasileiros',
        texto: 'O Candomblé, a Umbanda e o Tambor de Mina são exemplos de tradições que chegaram ao Brasil com os povos africanos escravizados e aqui se reinventaram. Cada orixá, cada entidade, cada canto é um fio que conecta o presente à África — a terra que foi arrancada mas nunca esquecida. O corpo que dança no xirê (roda do Candomblé) não dança por si: dança para todos os que vieram antes.',
      },
      {
        subtitulo: 'Rituais indígenas',
        texto: 'Para os povos originários do Brasil, não existe separação entre natureza, espiritualidade e cotidiano. A Pajelança, o Toré, as cerimônias do Kuarup — cada uma delas é uma forma de manter viva a relação entre os humanos, a floresta, os animais e os ancestrais. O xamã (ou pajé) é o guardião dessas pontes.',
      },
      {
        subtitulo: 'Rituais nas brincadeiras de roda',
        texto: 'Muitas brincadeiras que chegaram até nós carregam DNA ritual. A Ciranda é descendente das rodas de Xangô. O Jongo é cerimônia e jogo ao mesmo tempo. O Maculelê mistura dança, luta e oferenda. Quando uma criança entra na roda, ela está, sem saber, participando de algo muito maior — uma corrente humana que atravessa séculos.',
      },
      {
        subtitulo: 'Como trazer rituais para o dia a dia',
        texto: 'Você não precisa de um terreiro para viver rituais. Um círculo de conversa com intenção é um ritual. Um momento de silêncio antes de começar uma atividade é um ritual. Chamar cada pessoa pelo nome antes de uma dinâmica é um ritual. O Tatuapé nasceu exatamente dessa ideia: transformar o brincar em prática consciente e ancestral.',
      },
    ],
  },
  {
    slug: 'festas',
    titulo: 'Festas Populares',
    subtitulo: 'A alegria como forma de resistência',
    emoji: '🎊',
    cor: '#4a90e2',
    corClara: '#edf4fd',
    resumo: 'As festas populares brasileiras são muito mais do que celebrações. São gestos de resistência, memória viva e construção de identidade coletiva — do Bumba Meu Boi ao Maracatu, da Festa Junina ao Carnaval.',
    tempoLeitura: '4 min',
    paragrafos: [
      {
        texto: 'No Brasil, festejar é um ato político. As festas populares nasceram muitas vezes da necessidade de preservar culturas proibidas — danças que eram criminalizadas, línguas perseguidas, deuses que precisavam se disfarçar de santos. A alegria, aqui, sempre foi uma forma de sobreviver.',
      },
      {
        subtitulo: 'Festa Junina: sincretismo em quadrilha',
        texto: 'A Festa Junina chegou ao Brasil com os colonizadores europeus e se misturou com elementos indígenas e africanos. A quadrilha que dançamos hoje é diferente da francesa original — é nossa, é nordestina, é coletiva. Os santos juninos (Antônio, João, Pedro) convivem com simpatias de raiz indígena e a cachaça que alimenta o forró.',
      },
      {
        subtitulo: 'Bumba Meu Boi: o boi que ressuscita',
        texto: 'No Maranhão, o Bumba Meu Boi é uma das festas mais ricas e complexas do Brasil. A história do boi que morre e ressuscita é uma metáfora da própria resistência do povo nordestino. Cada grupo (sotaque) tem sua música, fantasia e dança — são comunidades inteiras que se organizam ao redor dessa celebração durante meses.',
      },
      {
        subtitulo: 'Maracatu: corte africana no Brasil',
        texto: 'O Maracatu de Baque Virado, de Pernambuco, é uma reinvenção das cortes reais africanas. O cortejo carrega uma rainha, um rei, damas do paço e a calunga — boneca sagrada que representa os ancestrais. No carnaval, o tambor do maracatu é o coração que bate mais forte.',
      },
      {
        subtitulo: 'Por que festejar junto importa',
        texto: 'Festas criam pertencimento. Quando uma comunidade dança junta, canta junta, veste a mesma fantasia ou prepara o mesmo prato, ela está dizendo: "somos um povo". As brincadeiras de roda que usamos no Tatuapé carregam esse mesmo espírito — o da festa como construção coletiva de identidade.',
      },
    ],
  },
  {
    slug: 'historias-cantadas',
    titulo: 'Histórias Cantadas',
    subtitulo: 'A voz que guarda o que o papel não consegue',
    emoji: '🎵',
    cor: '#4a7c59',
    corClara: '#edf7f0',
    resumo: 'Antes da escrita, havia a canção. As histórias cantadas — cantigas de roda, repentes, pontos de terreiro, causos em verso — são a memória viva dos povos, passada de boca em boca, de geração em geração.',
    tempoLeitura: '5 min',
    paragrafos: [
      {
        texto: 'Toda cultura começa com uma voz. Antes dos livros, antes das telas, antes de qualquer suporte, havia a voz humana — que cantava para curar, para ensinar, para lembrar, para resistir. As histórias cantadas são o arquivo mais antigo da humanidade.',
      },
      {
        subtitulo: 'Cantigas de roda: sabedoria disfarçada de jogo',
        texto: '"Bão balalão, senhor capitão" — o que parece nonsense infantil esconde, muitas vezes, uma memória de resistência. Pesquisadores identificam em diversas cantigas referências codificadas ao cativeiro, à liberdade e às divindades africanas. As crianças cantavam sem saber que guardavam história.',
      },
      {
        subtitulo: 'O repente e o cordel nordestinos',
        texto: 'No Nordeste, o cantador e o cordelista são os jornalistas, os filósofos e os poetas do povo. O repente — improviso cantado — é um duelo de inteligência e criatividade. O cordel — poesia rimada impressa em folhas — levou notícia, crítica social e fantasia a regiões onde o livro não chegava. Ambos são formas de democracia cultural.',
      },
      {
        subtitulo: 'Pontos de terreiro: música como ritual',
        texto: 'No Candomblé, na Umbanda e no Tambor de Mina, cada orixá, cada entidade tem seus próprios pontos (cantos). Esses pontos não são meras músicas — são chamados, são portais, são memórias de África transmitidas por séculos sem que uma nota fosse esquecida. A comunidade religiosa é a guardiã desse repertório sagrado.',
      },
      {
        subtitulo: 'Cantar para não esquecer',
        texto: 'As histórias cantadas ensinavam às crianças sobre o mundo, sobre os perigos da floresta, sobre os valores da comunidade, sobre os antepassados que vieram antes. Quando cantamos com crianças hoje — em rodas, em brincadeiras, em rituais coletivos — estamos continuando essa cadeia. A voz que canta hoje é eco de todas as vozes que vieram antes.',
      },
      {
        subtitulo: 'Histórias cantadas no Tatuapé',
        texto: 'Brincadeiras como a Ciranda, o Coco de Roda e o Samba de Roda são histórias cantadas em movimento. Ao introduzi-las para crianças, não estamos apenas ensinando uma dança — estamos entregando a elas um fio que as conecta a gerações de pessoas que, em tempos muito difíceis, encontraram na canção uma forma de se manter inteiras.',
      },
    ],
  },
]

export function getArtigoPorSlug(slug: string): ArtigoCultura | undefined {
  return ARTIGOS_CULTURA.find(a => a.slug === slug)
}
