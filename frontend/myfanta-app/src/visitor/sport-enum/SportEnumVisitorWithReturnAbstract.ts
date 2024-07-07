import { SportEnumVisitorWithReturn } from "./SportEnumVisitorWithReturn";

export class SportEnumVisitorWithReturnAbstract<I> implements SportEnumVisitorWithReturn<I> {
    
    footballSoccer(): I {
        throw new Error("Football soccer not supported");
    }
    volleyball(): I {
        throw new Error("Volleyball not supported.");
    }
    basketball(): I {
        throw new Error("Basketball not supported.");
    }

}