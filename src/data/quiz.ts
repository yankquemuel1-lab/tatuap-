export interface QuizPergunta {
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

export const QUIZ: Record<string, QuizPergunta[]> = {
  'samba-de-roda': [
    {
      pergunta: 'De qual região do Brasil o Samba de Roda é originário?',
      opcoes: ['Amazônia', 'Recôncavo Baiano', 'Pantanal', 'Serra Gaúcha'],
      correta: 1,
      explicacao: 'O Samba de Roda nasceu no Recôncavo Baiano no século XVII, nos terreiros e quilombos.',
    },
    {
      pergunta: 'Quando o Samba de Roda foi reconhecido como Patrimônio da UNESCO?',
      opcoes: ['1999', '2005', '2010', '2015'],
      correta: 1,
      explicacao: 'Em 2005, o Samba de Roda se tornou o primeiro gênero musical brasileiro a ser reconhecido pela UNESCO como Patrimônio Oral e Imaterial da Humanidade.',
    },
    {
      pergunta: 'O que é a "umbigada" no Samba de Roda?',
      opcoes: ['Um passo de dança rápido', 'Um toque no ombro', 'O convite para dançar com o quadril', 'O nome do instrumento principal'],
      correta: 2,
      explicacao: 'A umbigada é o gesto de convite para entrar no centro da roda — uma aproximação com o quadril que vem das tradições africanas.',
    },
  ],
  'coco-de-roda': [
    {
      pergunta: 'O Coco de Roda combina tradições de quais povos?',
      opcoes: ['Europeus e Asiáticos', 'Africanos e Indígenas do Nordeste', 'Guarani e Yanomami', 'Portugueses e Espanhóis'],
      correta: 1,
      explicacao: 'O Coco de Roda mistura o sapateado africano com ritmos dos povos indígenas do litoral nordestino.',
    },
    {
      pergunta: 'Qual é o movimento principal do Coco de Roda?',
      opcoes: ['Giro no próprio eixo', 'Sapateado rítmico', 'Pular em cima de tambores', 'Dançar com bastões'],
      correta: 1,
      explicacao: 'O sapateado vigoroso é a marca principal do Coco, herdado das tradições musicais africanas.',
    },
    {
      pergunta: 'O nome "Coco de Roda" vem de:',
      opcoes: ['Do fruto do coqueiro, abundante no litoral', 'De um personagem folclórico', 'De uma palavra africana', 'Do som do instrumento'],
      correta: 0,
      explicacao: 'O nome vem do coqueiro, fruta símbolo do litoral nordestino onde essa dança nasceu.',
    },
  ],
  'ciranda': [
    {
      pergunta: 'Qual é a característica mais importante da Ciranda?',
      opcoes: ['Apenas especialistas podem dançar', 'Quem chega entra, a roda não para', 'É preciso saber cantar', 'Só crianças participam'],
      correta: 1,
      explicacao: 'A Ciranda é a dança mais democrática do Brasil — quem chega entra, quem cansa sai, e a roda não para.',
    },
    {
      pergunta: 'A Ciranda é originária de qual estado?',
      opcoes: ['Bahia', 'Rio de Janeiro', 'Pernambuco', 'Maranhão'],
      correta: 2,
      explicacao: 'A Ciranda nasceu nas praias de Pernambuco no século XVII, sendo Lia de Itamaracá a sua maior guardiã.',
    },
    {
      pergunta: 'A Ciranda mistura tradições de quais origens?',
      opcoes: ['Apenas africanas', 'Africanas, indígenas e portuguesas', 'Japonesas e africanas', 'Apenas indígenas'],
      correta: 1,
      explicacao: 'A Ciranda é síntese da miscigenação brasileira: tem raízes nas rodas africanas, rituais circulares indígenas e danças de roda portuguesas.',
    },
  ],
  'jongo': [
    {
      pergunta: 'O Jongo é tradição de qual povo africano?',
      opcoes: ['Yorubá', 'Bantu', 'Fon', 'Mandinga'],
      correta: 1,
      explicacao: 'O Jongo vem dos povos Bantu trazidos para o sudeste do Brasil, especialmente para o Vale do Paraíba.',
    },
    {
      pergunta: 'As letras do Jongo, chamadas "pontos", eram usadas para:',
      opcoes: ['Contar histórias infantis', 'Comunicação codificada entre escravizados', 'Cantos de guerra', 'Rezas religiosas públicas'],
      correta: 1,
      explicacao: 'Os "pontos" do Jongo carregavam mensagens codificadas entre os escravizados nas fazendas de café.',
    },
    {
      pergunta: 'O Jongo foi reconhecido pelo IPHAN em:',
      opcoes: ['1995', '2000', '2005', '2015'],
      correta: 2,
      explicacao: 'O IPHAN reconheceu o Jongo como Patrimônio Cultural Imaterial do Brasil em 2005.',
    },
  ],
  'tambor-de-crioula': [
    {
      pergunta: 'O Tambor de Crioula é originário de qual estado?',
      opcoes: ['Bahia', 'Pernambuco', 'Maranhão', 'Rio de Janeiro'],
      correta: 2,
      explicacao: 'O Tambor de Crioula é manifestação cultural afro-brasileira do Maranhão, com raízes nos povos Bantu.',
    },
    {
      pergunta: 'Em honra a quem o Tambor de Crioula é dançado?',
      opcoes: ['Oxum', 'São Benedito', 'Iemanjá', 'Nossa Senhora'],
      correta: 1,
      explicacao: 'O Tambor de Crioula é dançado em homenagem a São Benedito, o santo negro — exemplo do sincretismo afro-brasileiro.',
    },
    {
      pergunta: 'O que é a "puada" no Tambor de Crioula?',
      opcoes: ['O nome do tambor principal', 'Gesto de celebração entre dançarinas', 'Um passo de dança rápido', 'A roupa típica'],
      correta: 1,
      explicacao: 'A puada é o gesto de celebração e reconhecimento entre as coreiras — uma aproximação frontal entre duas mulheres.',
    },
  ],
  'maculele': [
    {
      pergunta: 'O Maculelê nasceu em qual cidade da Bahia?',
      opcoes: ['Salvador', 'Ilhéus', 'Santo Amaro da Purificação', 'Feira de Santana'],
      correta: 2,
      explicacao: 'O Maculelê nasceu em Santo Amaro da Purificação, no Recôncavo Baiano.',
    },
    {
      pergunta: 'Qual é a regra mais importante do Maculelê?',
      opcoes: ['Sempre dançar descalço', 'Nunca bater no bastão do outro', 'Bater no bastão, nunca na mão', 'Silêncio durante a dança'],
      correta: 2,
      explicacao: 'A regra sagrada é "bate no bastão, nunca na mão" — isso cria responsabilidade e cuidado mútuo.',
    },
    {
      pergunta: 'O Maculelê faz parte de qual tríade cultural do Recôncavo?',
      opcoes: ['Forró, Axé e Baião', 'Capoeira, Samba de Roda e Maculelê', 'Candomblé, Umbanda e Xangô', 'Ciranda, Frevo e Xaxado'],
      correta: 1,
      explicacao: 'Maculelê, Capoeira e Samba de Roda formam a tríade cultural do Recôncavo Baiano.',
    },
  ],
  'danca-do-tore': [
    {
      pergunta: 'Por quais povos indígenas o Toré é praticado?',
      opcoes: ['Kayapó e Yanomami', 'Fulni-ô, Xukuru e Potiguara', 'Guarani e Terena', 'Pataxó e Tupinambá'],
      correta: 1,
      explicacao: 'O Toré é ritual sagrado dos povos indígenas do Nordeste, como Fulni-ô, Xukuru, Potiguara, Kariri e outros.',
    },
    {
      pergunta: 'Para os povos indígenas, dançar o Toré é também:',
      opcoes: ['Apenas uma dança folclórica', 'Um ato político de afirmação de identidade', 'Um espetáculo turístico', 'Uma competição entre aldeias'],
      correta: 1,
      explicacao: 'O Toré é ato político de resistência — índios que dançam o Toré afirmam publicamente sua identidade indígena.',
    },
    {
      pergunta: 'O que se pede para fazer antes de dançar o Toré com respeito?',
      opcoes: ['Usar fantasia indígena', 'Pedir permissão ao vento', 'Tirar os sapatos e sentir o chão', 'Pintar o rosto obrigatoriamente'],
      correta: 2,
      explicacao: 'Tirar os sapatos e sentir o chão é gesto de respeito — o chão é como altar para os povos que praticam o Toré.',
    },
  ],
  'siriri': [
    {
      pergunta: 'Qual instrumento é o símbolo do Siriri e Patrimônio Cultural Imaterial do Brasil?',
      opcoes: ['Berimbau', 'Viola de cocho', 'Tambor de crioula', 'Rabeca'],
      correta: 1,
      explicacao: 'A Viola de Cocho, feita de uma única peça de madeira mole, é o instrumento símbolo do Siriri e foi reconhecida pelo IPHAN em 2004.',
    },
    {
      pergunta: 'O Siriri é a dança tradicional de qual região do Brasil?',
      opcoes: ['Baixada Cuiabana, Mato Grosso', 'Recôncavo Baiano', 'Litoral Cearense', 'Serra Gaúcha'],
      correta: 0,
      explicacao: 'O Siriri é a expressão cultural mais característica da Baixada Cuiabana, região de várzeas em torno de Cuiabá, capital de Mato Grosso.',
    },
    {
      pergunta: 'De onde vem o nome "Siriri"?',
      opcoes: ['De uma palavra indígena Bororo', 'Do nome de uma mestra tradicional', 'De um besouro cuja vibração ritmada inspirou a dança', 'De um canto de trabalho das minas de ouro'],
      correta: 2,
      explicacao: 'O nome Siriri vem de um besouro da região do Mato Grosso, cujo zum-zum ritmado inspirou o compasso característico da dança.',
    },
  ],
  'bate-coxa': [
    {
      pergunta: 'Por que a percussão corporal era importante para os escravizados?',
      opcoes: ['Era mais fácil que tocar instrumentos', 'Os tambores foram proibidos pelos colonizadores', 'Era uma competição entre senzalas', 'Não havia motivo especial'],
      correta: 1,
      explicacao: 'A percussão corporal mantinha os ritmos sagrados mesmo quando os tambores foram proibidos no século XVIII.',
    },
    {
      pergunta: 'O Bate Coxa tem origem em qual região?',
      opcoes: ['Amazônia', 'Rio Grande do Sul', 'Pernambuco e Alagoas', 'Minas Gerais'],
      correta: 2,
      explicacao: 'O Bate Coxa tem raízes nos povos africanos escravizados em Pernambuco e Alagoas.',
    },
    {
      pergunta: 'Qual tradição africana é "prima" do Bate Coxa?',
      opcoes: ['Djembê sul-africano', 'Gumboot Dance sul-africano', 'Tam-tam congolês', 'Kora gambiana'],
      correta: 1,
      explicacao: 'O Gumboot Dance sul-africano e o Hambone norte-americano são tradições irmãs do Bate Coxa — todas percussão corporal afro-diaspórica.',
    },
  ],
  'obwisana': [
    {
      pergunta: 'De onde vem o jogo Obwisana?',
      opcoes: ['Nigéria', 'Tanzânia', 'Gana — povo Akan', 'Congo'],
      correta: 2,
      explicacao: 'Obwisana é jogo tradicional do povo Akan de Gana, África Ocidental.',
    },
    {
      pergunta: 'O que a frase "Obwisana sa nana" significa?',
      opcoes: ['Vamos jogar juntos', 'Caí em cima do avó de vó', 'A pedra é minha amiga', 'Gira a roda feliz'],
      correta: 1,
      explicacao: 'A frase em Akan significa "Caí em cima do avó de vó" — um verso bem-humorado da canção.',
    },
    {
      pergunta: 'Muitos afro-brasileiros descendem dos povos Akan. Isso significa que:',
      opcoes: ['O Obwisana pode ser uma brincadeira de ancestrais brasileiros', 'Nenhuma relação existe', 'Eles vieram de Gana recentemente', 'São todos do mesmo estado'],
      correta: 0,
      explicacao: 'Os Akan foram um dos maiores grupos trazidos para o Brasil. Brincar de Obwisana pode ser reconectar com ancestrais.',
    },
  ],
  'a-canoa-virou': [
    {
      pergunta: 'Por que a canoa é símbolo importante na cultura brasileira?',
      opcoes: ['É o transporte mais rápido', 'É símbolo central para povos indígenas e quilombolas', 'Vem de festas medievais portuguesas', 'Representa prosperidade'],
      correta: 1,
      explicacao: 'A canoa é meio de transporte, sobrevivência e identidade para os povos indígenas amazônicos e comunidades quilombolas.',
    },
    {
      pergunta: 'No jogo, quem pode "salvar" alguém que está no centro?',
      opcoes: ['Apenas o facilitador', 'Quem estiver no centro pode salvar alguém', 'Ninguém pode ser salvo', 'O mais novo do grupo'],
      correta: 1,
      explicacao: 'Quem está no centro pode "salvar" alguém — os dois fazem gesto de vitória, equilibrando brincadeira e cuidado.',
    },
    {
      pergunta: 'Qual valor importante essa brincadeira trabalha?',
      opcoes: ['Competição intensa', 'Autoironia e cuidado com o outro', 'Silêncio e concentração', 'Velocidade e força'],
      correta: 1,
      explicacao: 'Rir de si mesmo com o grupo é um ato de confiança — a autoironia como prática de pertencimento.',
    },
  ],
  'brincadeira-da-mandioca': [
    {
      pergunta: 'A mandioca foi domesticada há quanto tempo pelos povos indígenas?',
      opcoes: ['500 anos', '2.000 anos', '10.000 anos', '100 anos'],
      correta: 2,
      explicacao: 'A mandioca foi domesticada pelos povos indígenas da Amazônia há mais de 10.000 anos.',
    },
    {
      pergunta: 'A Brincadeira da Mandioca vem dos povos:',
      opcoes: ['Kayapó e Yanomami', 'Terena e Guarani', 'Pataxó e Tupinambá', 'Xukuru e Fulni-ô'],
      correta: 1,
      explicacao: 'A brincadeira vem das tradições lúdicas dos povos Terena e Guarani do Brasil Central e Sul.',
    },
    {
      pergunta: 'Qual é a regra de segurança mais importante nessa brincadeira?',
      opcoes: ['Usar luvas', 'NUNCA puxar pelo pescoço', 'Todos devem estar de pé', 'Silêncio absoluto'],
      correta: 1,
      explicacao: 'O facilitador deve puxar gentilmente pela cintura, NUNCA pelo pescoço — regra fundamental de segurança.',
    },
  ],
  'passa-o-anel': [
    {
      pergunta: 'O que o jogo "Passa o Anel" desenvolve principalmente?',
      opcoes: ['Força física', 'Observação e percepção emocional', 'Velocidade de corrida', 'Memória de longa duração'],
      correta: 1,
      explicacao: 'É um jogo de leitura humana que desenvolve observação, percepção das emoções e linguagem não-verbal.',
    },
    {
      pergunta: 'O anel tem significado especial em muitas culturas africanas porque representa:',
      opcoes: ['Riqueza material', 'Compromisso e pertencimento', 'Poder de liderança', 'Sorte em batalhas'],
      correta: 1,
      explicacao: 'O anel representa compromisso e pertencimento em muitas tradições africanas.',
    },
    {
      pergunta: 'Qual é o desafio principal de quem tem o anel?',
      opcoes: ['Gritar o nome do próximo', 'Agir exatamente igual a quem não tem', 'Correr mais rápido', 'Manter os olhos fechados'],
      correta: 1,
      explicacao: 'Quem tem o anel deve disfarçar perfeitamente — agindo como quem não tem é o desafio central.',
    },
  ],
  'terra-mar': [
    {
      pergunta: 'Terra-Mar é jogo tradicional de qual país africano?',
      opcoes: ['Nigéria', 'Etiópia', 'Moçambique', 'Senegal'],
      correta: 2,
      explicacao: 'Terra-Mar é jogo tradicional de Moçambique, país do sudeste africano com costas no Oceano Índico.',
    },
    {
      pergunta: 'O que acontece com quem pular para o lado errado?',
      opcoes: ['Sai do jogo para sempre', 'Senta por 30 segundos e volta', 'Perde 10 pontos', 'Deve cantar uma música'],
      correta: 1,
      explicacao: 'Sem eliminação permanente — quem erra senta por 30 segundos e volta. O foco é na diversão, não na exclusão.',
    },
    {
      pergunta: 'Qual variação deixa o jogo geograficamente educativo?',
      opcoes: ['Versão noturna', 'Versão Amazônica: "Floresta!" e "Rio!"', 'Versão silenciosa', 'Versão com música'],
      correta: 1,
      explicacao: 'A versão amazônica com "Floresta!" e "Rio!" conecta o jogo com a geografia brasileira.',
    },
  ],
  'fogo-na-montanha': [
    {
      pergunta: 'Fogo na Montanha é jogo da:',
      opcoes: ['África do Sul', 'Tanzânia', 'Angola', 'Guiné-Bissau'],
      correta: 1,
      explicacao: 'É jogo tradicional da Tanzânia, lar do Monte Kilimanjaro e berço dos primeiros Homo sapiens.',
    },
    {
      pergunta: 'Qual é a regra central do jogo?',
      opcoes: ['Pular sempre que ouvir "fogo"', 'Pular apenas quando ouvir "Fogo na Montanha", não outras variações', 'Correr em círculos', 'Ficar imóvel ao ouvir "fogo"'],
      correta: 1,
      explicacao: 'Só se pula quando ouvir "Fogo na Montanha" especificamente — qualquer outra frase com "fogo" é uma armadilha.',
    },
    {
      pergunta: 'Os povos Chaga do Kilimanjaro usavam jogos de atenção para:',
      opcoes: ['Entretenimento apenas', 'Preparar crianças para a vida na montanha', 'Escolher líderes', 'Rituais de passagem para adultos'],
      correta: 1,
      explicacao: 'Os Chaga usavam jogos de atenção para preparar crianças para a vida na montanha, onde o fogo era sinal real de perigo.',
    },
  ],
  'mamba-em-roda': [
    {
      pergunta: 'A mamba negra é conhecida por ser:',
      opcoes: ['A maior cobra do mundo', 'Uma das serpentes mais rápidas da África', 'Uma cobra aquática', 'Originária do Brasil'],
      correta: 1,
      explicacao: 'A mamba negra (Dendroaspis polylepis) é uma das serpentes mais rápidas e respeitadas da África.',
    },
    {
      pergunta: 'No jogo, apenas quem pode capturar outros jogadores?',
      opcoes: ['Qualquer parte da serpente', 'Apenas a "cabeça da mamba"', 'A cauda da serpente', 'O jogador mais rápido'],
      correta: 1,
      explicacao: 'Apenas a cabeça pode capturar — o corpo ajuda bloqueando o caminho, ensinando cooperação e estratégia.',
    },
    {
      pergunta: 'O conceito Ubuntu se aplica a esse jogo porque:',
      opcoes: ['Todos competem individualmente', 'A serpente só é forte quando seus membros trabalham juntos', 'Quanto menos pessoas, melhor', 'O vencedor recebe prêmio'],
      correta: 1,
      explicacao: 'Ubuntu — "sou porque somos" — está no coração do jogo: a serpente cresce em força com a cooperação.',
    },
  ],
  'jogo-do-pilao': [
    {
      pergunta: 'O pilão é instrumento sagrado na culinária afro-brasileira para fazer:',
      opcoes: ['Bolo de arroz apenas', 'Acarajé, abará, pamonha e angu, entre outros', 'Suco de frutas', 'Bebidas fermentadas'],
      correta: 1,
      explicacao: 'Sem o pilão não existem acarajé, abará, pamonha nem angu — ele é instrumento fundamental da culinária afro-brasileira.',
    },
    {
      pergunta: 'Nas comunidades quilombolas, socar o pilão em grupo era:',
      opcoes: ['Trabalho individual e solitário', 'Ritual coletivo que fortalecia laços comunitários', 'Punição para os mais fracos', 'Atividade apenas feminina'],
      correta: 1,
      explicacao: 'Socar o pilão em grupo era ritual coletivo — o som rítmico era também forma de comunicação entre as pessoas.',
    },
    {
      pergunta: 'O padrão de movimento do Jogo do Pilão é:',
      opcoes: ['Aleatório e livre', 'BATE-BATE-abre (soque-soque-levanta)', 'Uma batida por vez', 'Circular sem parar'],
      correta: 1,
      explicacao: 'O ritmo sagrado do pilão é: BATE-BATE-abre — dois soques e um levantamento, nunca aleatório.',
    },
  ],
  'ampe': [
    {
      pergunta: 'Ampe é jogo do povo Akan, famoso por seu sistema:',
      opcoes: ['Patrilinear (linhagem pelo pai)', 'Matrilinear (linhagem pela mãe)', 'De castas rígidas', 'De monarquia absoluta'],
      correta: 1,
      explicacao: 'O povo Akan é famoso por seu sistema matrilinear — a linhagem passa pela mãe.',
    },
    {
      pergunta: 'O Ampe é especialmente democrático porque:',
      opcoes: ['Só os mais fortes vencem', 'Tem 50% de chance para cada jogador em cada salto', 'Os adultos sempre ganham', 'É baseado em memória'],
      correta: 1,
      explicacao: 'Com 50% de probabilidade em cada salto, o Ampe permite que qualquer pessoa vença, independente de habilidade.',
    },
    {
      pergunta: 'Como se pontua no Ampe?',
      opcoes: ['Quem cair menos', 'O líder marca ponto quando os pés de cada dupla são diferentes', 'Quem pular mais alto', 'Quem bater palmas mais forte'],
      correta: 1,
      explicacao: 'O líder faz um ponto cada vez que os pés são diferentes; se forem iguais, o outro jogador torna-se o novo líder.',
    },
  ],
  'peteca-em-roda': [
    {
      pergunta: 'A peteca foi inventada pelos:',
      opcoes: ['Portugueses no Brasil', 'Povos indígenas brasileiros', 'Africanos escravizados', 'Crianças europeias no século XVIII'],
      correta: 1,
      explicacao: 'A peteca é invenção genuinamente brasileira dos povos indígenas, com uso documentado em mais de 80 etnias.',
    },
    {
      pergunta: 'A palavra "peteca" vem do Tupi e significa:',
      opcoes: ['Objeto voador', 'Bater com a palma da mão', 'Alegria em círculo', 'Pena colorida'],
      correta: 1,
      explicacao: '"Peteca" vem do Tupi "peteka" — bater com a palma da mão.',
    },
    {
      pergunta: 'Hans Staden descreveu a peteca em que século?',
      opcoes: ['Século XIV', 'Século XVI (1557)', 'Século XVIII', 'Século XIX'],
      correta: 1,
      explicacao: 'Hans Staden descreveu a peteca em 1557, no século XVI, ficando fascinado com o brinquedo indígena.',
    },
  ],
  'kameshi-mpuku-ne': [
    {
      pergunta: '"Kameshi Mpuku Ne" em Kiluba significa:',
      opcoes: ['O leão e a gazela', 'O gato e o rato', 'A serpente e o pássaro', 'O rio e a montanha'],
      correta: 1,
      explicacao: '"Kameshi Mpuku Ne" significa "O Gato e o Rato" na língua Kiluba do povo Luba.',
    },
    {
      pergunta: 'O povo Luba criou um dos sistemas de escrita visuais da África chamado:',
      opcoes: ['Adinkra', 'Lukasa', 'Nsibidi', 'Vai'],
      correta: 1,
      explicacao: 'O Lukasa é um sistema de escrita visual criado pelo povo Luba — demonstra sua sofisticação intelectual.',
    },
    {
      pergunta: 'O que acontece quando o coordenador grita "VIRA!" no jogo?',
      opcoes: ['Todos correm para o centro', 'Todos giram 90 graus e mudam os corredores', 'O Gato para de correr', 'Troca quem é o Gato e o Rato'],
      correta: 1,
      explicacao: 'Ao "VIRA!", todos giram 90 graus — os corredores horizontais viram verticais, mudando completamente o labirinto.',
    },
  ],
  'roda-de-historias-grio': [
    {
      pergunta: 'Os Griôs são guardiões da memória em qual continente?',
      opcoes: ['América do Sul', 'África Ocidental', 'Ásia Central', 'Europa Medieval'],
      correta: 1,
      explicacao: 'Os Griôs são instituição milenar da África Ocidental — existem há mais de 3.000 anos entre os povos Mandinga, Wolof e Fula.',
    },
    {
      pergunta: 'No Brasil, a tradição griô sobreviveu principalmente em:',
      opcoes: ['Professores universitários', 'Benzedeiras, mestres de capoeira e pais de santo', 'Jornalistas e escritores', 'Políticos locais'],
      correta: 1,
      explicacao: 'As benzedeiras, contadores de história, mestres de capoeira e pais de santo são os griôs brasileiros.',
    },
    {
      pergunta: 'Na Roda de Histórias Griô, o fio de barbante representa:',
      opcoes: ['O tempo passando', 'A conexão entre cada voz que conta um trecho', 'Um enfeite decorativo', 'A fronteira entre os participantes'],
      correta: 1,
      explicacao: 'O fio cria uma teia visível de vozes conectadas — "Isso é a história de vocês. Cada fio é uma voz."',
    },
  ],
  'roda-das-plantas-medicinais': [
    {
      pergunta: 'Quanto por cento dos medicamentos modernos têm princípios ativos de plantas indígenas?',
      opcoes: ['20%', '50%', 'Mais de 80%', '100%'],
      correta: 2,
      explicacao: 'Mais de 80% dos medicamentos modernos têm princípios ativos descobertos primeiro em plantas usadas por povos indígenas.',
    },
    {
      pergunta: 'As benzedeiras afro-brasileiras são guardiãs de:',
      opcoes: ['Receitas culinárias antigas', 'Conhecimento de cura com plantas e rituais', 'Histórias de guerra', 'Técnicas de artesanato'],
      correta: 1,
      explicacao: 'As benzedeiras preservam o saber de cura com plantas há gerações — são as guardiãs da medicina popular brasileira.',
    },
    {
      pergunta: 'O Brasil tem quantas espécies de plantas medicinais?',
      opcoes: ['Cerca de 5.000', 'Cerca de 20.000', 'Mais de 55.000', 'Exatamente 100.000'],
      correta: 2,
      explicacao: 'O Brasil tem mais de 55.000 espécies de plantas — a maior biodiversidade medicinal do planeta.',
    },
  ],
  'toque-do-coracao': [
    {
      pergunta: 'No Candomblé e na Umbanda, o ritmo do tambor é usado como:',
      opcoes: ['Apenas música de fundo', 'Instrumento terapêutico para criar estados meditativos', 'Sinal de perigo', 'Entretenimento para visitantes'],
      correta: 1,
      explicacao: 'O ritmo é instrumento terapêutico reconhecido — os tambores tocavam no ritmo cardíaco para criar estados meditativos coletivos.',
    },
    {
      pergunta: 'Qual é o "metrônomo universal" que todos carregam?',
      opcoes: ['O ritmo da respiração', 'O batimento do coração', 'O piscar dos olhos', 'O ritmo da caminhada'],
      correta: 1,
      explicacao: 'O coração é o metrônomo universal — o primeiro ritmo que todos já ouviram foi dentro do ventre materno.',
    },
    {
      pergunta: 'Quando é especialmente útil usar o Toque do Coração?',
      opcoes: ['Apenas no início da aula', 'Após um conflito, um choro ou antes de uma conversa difícil', 'Apenas para adultos', 'Como punição'],
      correta: 1,
      explicacao: 'O Toque do Coração é extraordinário para usar após conflitos ou antes de conversas difíceis — o ritmo compartilhado acalma e une.',
    },
  ],
  'roda-dos-elementos': [
    {
      pergunta: 'Para os povos indígenas brasileiros, os 4 elementos são:',
      opcoes: ['Apenas fenômenos naturais', 'Seres vivos com quem se pode ter relacionamento', 'Símbolos decorativos', 'Forças abstratas sem personalidade'],
      correta: 1,
      explicacao: 'Diferente da visão europeia, os povos indígenas tratam os elementos como seres vivos com os quais é possível ter relacionamento.',
    },
    {
      pergunta: 'Para os Guarani, os elementos são manifestações de:',
      opcoes: ['Espíritos malignos', 'Nhanderu (o Criador)', 'Antepassados guerreiros', 'Fenômenos climáticos'],
      correta: 1,
      explicacao: 'Para os Guarani, os elementos são manifestações de Nhanderu — o Criador, o Pai de Todos.',
    },
    {
      pergunta: 'Na Roda dos Elementos, qual movimento representa o FOGO?',
      opcoes: ['Abaixar e tocar o chão', 'Balançar os braços como ondas', 'Erguer na ponta dos pés, tremendo como chamas', 'Soprar e girar no eixo'],
      correta: 2,
      explicacao: '"FOGO!" — erguer na ponta dos pés, tremendo como chamas. Cada elemento tem seu movimento corporal.',
    },
  ],
  'mandala-de-corpos': [
    {
      pergunta: 'Para os povos do cerrado como Xerente e Karajá, a aldeia é construída em forma de:',
      opcoes: ['Quadrado', 'Triângulo', 'Círculo (mandala)', 'Linha reta'],
      correta: 2,
      explicacao: 'As aldeias são construídas em forma circular — a mandala é a planta arquitetônica da comunidade.',
    },
    {
      pergunta: 'Nos padrões Adinkra dos Akan, formas circulares representam:',
      opcoes: ['Guerra e poder', 'Eternidade e interconexão', 'Fertilidade da terra', 'Tristeza e perda'],
      correta: 1,
      explicacao: 'Nos padrões Adinkra, círculos representam eternidade e interconexão — o ciclo sem fim.',
    },
    {
      pergunta: 'O que a Mandala de Corpos ensina sobre o grupo?',
      opcoes: ['Que cada um deve agir independentemente', 'Que o grupo é mais belo do que a soma das partes', 'Que os mais fortes lideram os outros', 'Que competir é a melhor forma de crescer'],
      correta: 1,
      explicacao: 'Ao criar beleza juntos, o grupo entende que é mais do que a soma das partes — a cooperação cria algo impossível individualmente.',
    },
  ],
  'espelho-vivo': [
    {
      pergunta: 'Ubuntu é filosofia de qual tradição africana?',
      opcoes: ['Yorubá do Oeste', 'Bantu da África Central e do Sul', 'Mandinga do Sahel', 'Fula da Guiné'],
      correta: 1,
      explicacao: 'Ubuntu é filosofia Bantu da África Central e do Sul, dos povos Zulu, Xhosa, Ndebele e outros.',
    },
    {
      pergunta: 'Ubuntu pode ser traduzido como:',
      opcoes: ['Força e coragem', 'Sou porque somos', 'Terra e ancestrais', 'Dança e ritmo'],
      correta: 1,
      explicacao: '"Sou porque somos" ou "Uma pessoa é uma pessoa por causa das outras pessoas" — o Ubuntu.',
    },
    {
      pergunta: 'Na fase 3 do Espelho Vivo (sem líder definido), o que acontece idealmente?',
      opcoes: ['Todos param e ficam confusos', 'Um movimento genuinamente compartilhado surge espontaneamente', 'O mais forte lidera automaticamente', 'O jogo precisa ser reiniciado'],
      correta: 1,
      explicacao: 'Quando acontece bem, surge um movimento genuíno e simultâneo — criando um silêncio de admiração genuína.',
    },
  ],
  'roda-da-gratidao': [
    {
      pergunta: 'Para os Guarani, a gratidão é praticada:',
      opcoes: ['Apenas nas festas anuais', 'Antes de cada refeição e ao começar qualquer atividade', 'Somente em rituais de morte', 'Apenas quando algo ruim acontece'],
      correta: 1,
      explicacao: 'Os Guarani oferecem gratidão antes de cada refeição e ao começar qualquer atividade — é prática cotidiana.',
    },
    {
      pergunta: 'Para os povos indígenas, a gratidão é principalmente:',
      opcoes: ['Uma emoção passageira', 'Uma relação de reconhecimento de interdependência', 'Uma obrigação religiosa', 'Um gesto formal sem significado'],
      correta: 1,
      explicacao: 'A gratidão não é apenas emoção — é relação: quando agradecemos, reconhecemos que vivemos em interdependência com tudo.',
    },
    {
      pergunta: 'Com crianças de 3-4 anos, qual é a melhor pergunta para a Roda da Gratidão?',
      opcoes: ['O que você aprendeu hoje?', 'Qual foi o momento mais difícil?', 'O que foi mais gostoso hoje?', 'Quem você ama?'],
      correta: 2,
      explicacao: '"O que foi mais gostoso hoje?" é a linguagem acessível — mesma prática da gratidão, adequada para a faixa etária.',
    },
  ],
  'roda-do-nome-sagrado': [
    {
      pergunta: 'Para os Guarani, o nome de uma pessoa é dado baseado em:',
      opcoes: ['O nome do pai ou avó', 'Sonhos e revelações espirituais', 'A ordem de nascimento', 'O mês do nascimento'],
      correta: 1,
      explicacao: 'Os Guarani dão nomes baseados em sonhos e revelações espirituais — o nome carrega a essência espiritual da pessoa.',
    },
    {
      pergunta: 'Muitos nomes de lugares brasileiros vêm de qual língua?',
      opcoes: ['Latim', 'Yorubá', 'Tupi', 'Árabe'],
      correta: 2,
      explicacao: 'Nomes como Paraíba, Itaquaquecetuba e Pindamonhangaba vêm do Tupi — a língua dos povos indígenas do litoral.',
    },
    {
      pergunta: 'Para os Kayapó, o nome de uma pessoa:',
      opcoes: ['Nunca muda', 'Descreve a personalidade que o espírito trouxe', 'É escolhido aleatoriamente', 'Sempre homenageia um ancestral morto'],
      correta: 1,
      explicacao: 'Os Kayapó têm nomes que descrevem a personalidade que o espírito da criança trouxe ao mundo.',
    },
  ],
  'roda-das-sementes': [
    {
      pergunta: 'Quantas espécies de plantas os povos indígenas brasileiros ajudaram a domesticar para o mundo?',
      opcoes: ['Cerca de 10', 'Cerca de 50', 'Mais de 150', 'Exatamente 200'],
      correta: 2,
      explicacao: 'Os povos indígenas brasileiros domesticaram ou melhoraram mais de 150 espécies de plantas, incluindo milho, mandioca, batata-doce e cacau.',
    },
    {
      pergunta: 'As "Guardiãs de Sementes" são:',
      opcoes: ['Cientistas em laboratórios', 'Mulheres indígenas que preservam sementes crioulas ancestrais', 'Empresas de biotecnologia', 'ONGs internacionais'],
      correta: 1,
      explicacao: 'As Guardiãs de Sementes são mulheres indígenas que preservam sementes crioulas passadas de geração em geração — alguns cultivares têm mais de 8.000 anos.',
    },
    {
      pergunta: 'Dentro de uma semente há:',
      opcoes: ['Apenas água e proteínas', 'Memória de milhares de anos de cuidado humano', 'Apenas material genético estático', 'Nada além do embrião'],
      correta: 1,
      explicacao: 'A semente é arquivo vivo — carrega milhares de anos de seleção, cuidado e conhecimento humano.',
    },
  ],
  'roda-da-floresta': [
    {
      pergunta: 'Para povos como Yanomami e Kayapó, a floresta é:',
      opcoes: ['Apenas recurso natural a ser explorado', 'Comunidade, ancestral, parente — não separada do humano', 'Um lugar de perigo a ser evitado', 'Propriedade do governo'],
      correta: 1,
      explicacao: 'A floresta não é "natureza" separada do humano — é comunidade, ancestral e parente para esses povos.',
    },
    {
      pergunta: 'O conceito de "Encantados" na cultura popular reconhece que:',
      opcoes: ['Animais são perigosos', 'Animais, plantas e lugares são habitados por espíritos que merecem respeito', 'A floresta é mágica apenas em histórias', 'Apenas xamãs podem entrar na floresta'],
      correta: 1,
      explicacao: 'Os "Encantados" são espíritos que habitam animais, plantas e lugares — merecem respeito, não exploração.',
    },
    {
      pergunta: 'A Amazônia brasileira tem aproximadamente quantas espécies de pássaros?',
      opcoes: ['100', '500', '1.300', '5.000'],
      correta: 2,
      explicacao: 'A Amazônia abriga cerca de 1.300 espécies de pássaros — a maior diversidade de aves do planeta.',
    },
  ],
  'teia-da-vida': [
    {
      pergunta: 'Para os povos Lakota da América do Norte, "Mitákuye Oyásʼiŋ" significa:',
      opcoes: ['Somos guerreiros', 'Todos somos parentes', 'A terra é nossa mãe', 'O céu nos guia'],
      correta: 1,
      explicacao: '"Mitákuye Oyásʼiŋ" — "todos somos parentes" — expressão da interconexão de todos os seres.',
    },
    {
      pergunta: 'O que acontece com a teia quando alguém puxa seu fio?',
      opcoes: ['Nada — os outros não sentem', 'Todos sentem o movimento — vivenciando a interconexão', 'A teia se desfaz completamente', 'Apenas os vizinhos próximos sentem'],
      correta: 1,
      explicacao: 'Quando um fio se move, todos sentem — vivenciando corporalmente que nossas ações afetam a todos.',
    },
    {
      pergunta: 'Para os Guarani, "Yvy Marãeỹ" (a terra sem males) é:',
      opcoes: ['Um lugar geográfico específico', 'Um lugar onde todos os seres vivem em harmonia', 'O paraíso após a morte', 'A aldeia original dos Guarani'],
      correta: 1,
      explicacao: 'Yvy Marãeỹ é a "terra sem males" — um lugar onde todos os seres vivem em harmonia, expressando a visão de interconexão Guarani.',
    },
  ],
  'roda-de-abayomi': [
    {
      pergunta: '"Abayomi" em Iorubá significa:',
      opcoes: ['Criança bonita', 'Encontro precioso ou aquele que traz alegria', 'Força do povo', 'Resistência eterna'],
      correta: 1,
      explicacao: '"Abayomi" significa "encontro precioso" ou "aquele que traz alegria ao se encontrar" na língua Iorubá.',
    },
    {
      pergunta: 'As bonecas Abayomi eram feitas durante:',
      opcoes: ['Festas de casamento', 'As travessias do Atlântico nos navios negreiros', 'Rituais de passagem', 'Feiras de artesanato'],
      correta: 1,
      explicacao: 'Mulheres africanas escravizadas faziam Abayomis durante as horrorosas travessias do Atlântico para acalmar as crianças.',
    },
    {
      pergunta: 'A Abayomi é feita sem cola e sem linha — apenas com:',
      opcoes: ['Cola natural de resina', 'Nós no tecido', 'Grampos metálicos', 'Costura simples'],
      correta: 1,
      explicacao: 'Apenas com nós — simbolizando os laços humanos que não podem ser quebrados mesmo na pior adversidade.',
    },
  ],
  'roda-de-encerramento': [
    {
      pergunta: 'Por que o encerramento é obrigatório nas tradições indígenas?',
      opcoes: ['É apenas uma formalidade', 'O que não é encerrado fica em aberto emocionalmente', 'Para marcar o tempo', 'Para que o facilitador descanse'],
      correta: 1,
      explicacao: 'O que não é encerrado fica em aberto emocionalmente — o encerramento transforma experiência em memória.',
    },
    {
      pergunta: 'Na filosofia Ubuntu, o encerramento honra que:',
      opcoes: ['O líder fez um bom trabalho', 'O grupo que se encontrou criou algo novo juntos', 'O tempo passou com eficiência', 'Todos cumpriram suas obrigações'],
      correta: 1,
      explicacao: 'O Ubuntu reconhece: o grupo que se encontrou não é mais o mesmo que chegou — algo novo foi criado juntos.',
    },
    {
      pergunta: 'O que os objetos naturais colocados no centro ao final representam?',
      opcoes: ['Resíduos a descartar', 'Uma oferenda coletiva — gratidão ao tempo compartilhado', 'Material para próxima atividade', 'Propriedade do facilitador'],
      correta: 1,
      explicacao: 'Os objetos naturais no centro formam uma pequena oferenda coletiva — gratidão à terra e ao tempo compartilhado.',
    },
  ],
}
