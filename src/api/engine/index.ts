import Parser from "./Parser";
import Runtime from "./Runtime";

class Engine {
    search(source: string) {
        const ast = Parser(source);
        return Runtime(ast);
    }
}

export default new Engine;