import { commands } from "@api";
import { KeywordNode, Node } from "./Ast";
import Lexer from "./Lexer";
import Parser from "./Parser";
import Runtime from "./Runtime";
import { TokenType } from "@consts";
import { Keyword } from "./Elements";
import { NotOk, Ok } from "@lib/utils";

// TODO: Otimizar a engine reutilizando a ast e tokens do search para usar no run e no get
export class Engine {
    search(source: string) {
        const [tokens, errors] = Lexer(source);
        if(errors) return NotOk(errors);
        
        const lastToken = source[source.length - 1] == ' ' ? undefined : tokens.pop();

        const [ast, errors2] = Parser.from(tokens);
        if(errors2) return NotOk(errors2);

        let lastKeyword: Keyword | undefined;
        lastKeyword = evaluate(ast);

        const choices = Array.from(lastKeyword
            ? lastKeyword.children.keys()
            : commands.keys()
        );

        return Ok(lastToken ? choices.filter(choice => choice.startsWith(lastToken.value as string)) : choices)   

        function evaluate(node?: Node) {
            switch (node?.kind) {
                case "Script": {
                    return evaluate(node.children);
                }
                case "Keyword": {
                    return lastKeyword 
                        ? lastKeyword.children.get((node as KeywordNode).id)! 
                        : commands.get((node as KeywordNode).id)!;
                }
            }
        }
    }

    run(source: string) {
        const [ script, errors ] = Parser(source);
        if(errors) return NotOk(errors);

        const [ result, errors2 ] = Runtime(script!);
        if(errors2) return NotOk(errors2); 
        
        switch (result.type) {
            case TokenType.Function:
                return Ok(result.value());
            
            default:
                return Ok(result.value);
        }
    }
}

export * from './Elements';