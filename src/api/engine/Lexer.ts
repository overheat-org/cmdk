// import { commandNames } from "@api";
const commandNames = ['app']
import { TokenType } from "@consts";

const isText = (code: number) => (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
const isNumber = (code: number) => code >= 48 && code <= 57;

export class BaseToken {
  constructor(
    public type: TokenType,
    public value?: string | number
  ) { }
}
export class Token extends BaseToken {
  toString() {
    return { type: TokenType[this.type], value: this.value }
  }
};

function Lexer(source: string) {
  let i = 0;
  const tokens = new Array<Token>();

  const curr = () => source[i];
  const next = () => source[++i] ?? '\0';
  const peek = () => source[i + 1] ?? '\0';
  const save = (tokenData: BaseToken) => tokens.push(new Token(tokenData.type, tokenData.value));
  const makeKeyword = (text: string) => void save({ type: TokenType.Keyword, value: text });
  const isKeyword = (text: string) => commandNames.find(n => n == text);
  const makeIdentifier = (text: string) => void save({ type: TokenType.Identifier, value: text });
  const makeNumber = () => {
    let number = curr();

    const isNumber = (charCode: number) => {
      return charCode >= 48 && charCode <= 57;
    };

    const readDigits = () => {
      if (isNumber(next().charCodeAt(0))) {
        number += curr();
        readDigits();
      }
    };

    if (number === '0' && (peek() === 'b' || peek() === 'x')) {
      number += next();
      readDigits();
    } else {
      readDigits();
    }

    save({ type: TokenType.Number, value: Number(number) });
    next();
  };

  while (i <= source.length) {
    const current = curr();

    const makeString = () => {
      const quote = current;
      let value = "";

      while (next() != quote) {
        value += curr();
      }

      save({ type: TokenType.String, value });
      next();
    }
    const makeText = () => {
      let text = current;

      const dashCode = 45; // -

      while (isText(next().charCodeAt(0)) || next().charCodeAt(0) == dashCode) {
        text += curr();
      }

      return next(), text;
    }

    switch (current) {
      case ' ':
        next();
        break;

      case '@':
        save({ type: TokenType.Decorator });
        next();
        break;

      case '>':
        save({ type: TokenType.Greater });
        next();
        break;

      case '#':
        save({ type: TokenType.Hash });
        next();
        break;

      case '"':
      case "'":
        makeString();
        break;

      default: {
        const asciiCode = current.charCodeAt(0);

        if (isNumber(asciiCode)) {
          makeNumber();
        }
        else if (isText(asciiCode)) {
          const text = makeText();

          if (isKeyword(text)) {
            makeKeyword(text);
          } else {
            makeIdentifier(text);
          }
        }
        else {
          throw new Error(`Character ${current} is unknown`);
        }
      };
    }
  }

  save({ type: TokenType.End });

  return tokens;
}

export default Lexer;
