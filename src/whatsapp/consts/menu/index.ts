export const menu = {
  1: {
    name: 'administração',
    subMenu: {
      1: 'Patrimônio',
      2: 'Administração',
    },
  },
  2: {
    name: 'tecnologia',
    subMenu: {
      1: 'suporte',
      2: 'desenvolvimento',
    },
  },
};

export const stages = {
  1: {
    name: 'menu',
    message:
      'Olá, seja bem vindo ao nosso atendimento virtual. Por favor, escolha uma das opções abaixo:',
    options: menu,
  },
  2: {
    name: 'confirm',
    message: 'Você escolheu a opção: ',
    options: {
      1: 'Sim',
      2: 'Não',
    },
  },
};
