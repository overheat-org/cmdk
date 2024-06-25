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

        const choices = lastKeyword
            ? Array.from(lastKeyword.children.keys())
            : [];

        return lastToken ? choices.filter(choice => choice.includes(lastToken.value as string)) : choices;

        function evaluate(node: Node) {
            switch (node.kind) {
                case "Script": evaluate(node.children!);
                case "Keyword": lastKeyword = lastKeyword 
                    ? lastKeyword.children.get((node as KeywordNode).id)! 
                    : commands.get((node as KeywordNode).id)!;
            }
        }
    }

    get(source: string) {
        const tokens = Lexer(source);
        const ast = Parser(tokens);
        return Runtime(ast);
    }

    run(source: string) {
        const r = this.get(source);
        
        switch (r.type) {
            case TokenType.Function:
                return r.value();
            
            default:
                return r.value;
        }
    }
}

export * from './Elements';