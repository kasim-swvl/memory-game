export const modes = {
  letters: {
    value: "letters",
    list: "abcdefghijklmnopqrstuvwxyz".split(""),
  },
  words: {
    value: "words",
    list: "life,love,near,ness,ring,wolf,fish,five,king,else,tree,over,time,able,have,sing,star,city,soul,rich,duck,foot,film,lion,anna,meme,live,safe,pain,rain,sion,iron,once,ball,with,fire,wood,care,cake,back,lady,away,work,self,mole,moon,golf,ally,nine,mary".split(
      ","
    ),
  },
};

export const difficulties = {
  easy: {
    value: "easy",
    time: 30,
    count: 8,
  },
  medium: {
    value: "medium",
    time: 60,
    count: 8 * 3,
  },
  hard: {
    value: "hard",
    time: 120,
    count: 8 * 5,
  },
};

const GAME = { modes, difficulties };

export default GAME;
