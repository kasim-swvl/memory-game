export const curry = fn => {
  return (...args) => {
    if (args.length < fn.length) {
      return (...rest) => fn(...args, ...rest);
    }
    return fn(...args);
  };
};

export const pipe = (...fns) => {
  return data => {
    return fns.reduce((a, fn) => fn(a), data);
  };
};

export const tap = fn => {
  return value => {
    fn(value);
    return value;
  };
};

export const merge = curry((l, r) => Object.assign({}, l, r));

export const formatTime = time => {
  let t1 = time;
  return [60, 1]
    .reduce((a, d) => {
      a.push(Math.floor(t1 / d));
      t1 = t1 % d;
      return a;
    }, [])
    .map(t => (t < 10 ? `0${t}` : t))
    .join(":");
};

export const pickRandom = list => {
  return list[Math.floor(Math.random() * list.length)];
};

export const pickRandomX = curry((count, list) => {
  if (!list.length) return [];

  const listIndicies = list.map((_, i) => i);
  return Array.from({ length: count })
    .reduce((a, _) => {
      const index = (function uniqRandom() {
        const draw = pickRandom(listIndicies);
        return a.includes(draw) ? uniqRandom() : draw;
      })();
      a.push(index);
      return a;
    }, [])
    .map(i => list[i]);
});

export const repeat = curry((c, d) => {
  return Array.from({ length: c }).map(_ => d);
});

export const flatten = list => {
  return list.flat(Infinity);
};

export const shuffle = list => {
  return pickRandomX(list.length, list);
};

export const fnMap = curry((fn, l) => {
  return l.map(fn);
});

export const fnReduce = curry((fn, init, l) => {
  return l.reduce(fn, init);
});

export const fnFilter = curry((fn, l) => {
  return l.filter(fn);
});
