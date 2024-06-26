import { commands } from "@api";
import { KeywordNode, Node } from "./Ast";
import Lexer from "./Lexer";
import Parser from "./Parser";
import Runtime from "./Runtime";
import { TokenType } from "@consts";
import { Keyword } from "./Elements";

// TODO: Otimizar a engine reutilizando a ast e tokens do search para usar no run e no get
export class Engine {
    search(source: string) {
        const tokens = Lexer(source);
        const lastToken = source[source.length - 1] == ' ' ? undefined : tokens.pop()!;

        const ast = Parser(tokens);

        let lastKeyword: Keyword | undefined;
        evaluate(ast);

        const choices = Array.from(lastKeyword
            ? lastKeyword.children.keys()
            : commands.keys()
        );

        return lastToken ? choices.filter(choice => choice.startsWith(lastToken.value as string)) : choices;

        function evaluate(node?: Node) {
            switch (node?.kind) {
                case "Script": {
                    evaluate(node.children);
                    break;
                }
                case "Keyword": {
                    lastKeyword = lastKeyword 
                        ? lastKeyword.children.get((node as KeywordNode).id)! 
                        : commands.get((node as KeywordNode).id)!;
                    break;
                }
                default: break
            }
        }
    }

    run(source: string) {
        const tokens = Lexer(source);
        const ast = Parser(tokens);
        const result = Runtime(ast);
        
        switch (result.type) {
            case TokenType.Function:
                return result.value();
            
            default:
                return result.value;
        }
    }
}

export * from './Elements';