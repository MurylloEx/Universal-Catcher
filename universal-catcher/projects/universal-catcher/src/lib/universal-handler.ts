import { ErrorHandler } from '@angular/core';

export class UniversalHandler implements ErrorHandler {

    public static errorCatcher: any = null;

    public static runCatcher(ngErr, ucErr){
        if (this.errorCatcher){
            UniversalHandler.errorCatcher(ngErr, ucErr);
        }
    }

    handleError(err){
        let RegexMessage = new RegExp(/^.+[\n\r]/i);
        let RegexTraces = new RegExp(/at[\s\t].+[\n\r]?/igm);
        let RegexSanitizeLines = new RegExp(/^at[\s\t]?/igm);
        let RegexFileNames = new RegExp(/(?:\(.+\)|^(?:[^()\s\t]+:\d+))/igm);

        if (!err.stack){
            return UniversalHandler.runCatcher(err, null);
        }

        let stack = err['stack'];
        
        let message = RegexMessage.exec(stack)[0];
        let traces = [];
        let match;
        do {
            match = RegexTraces.exec(stack);
            if (match){
                traces.push(String(match[0]).replace(RegexSanitizeLines, '').replace(/[\r\n]/igm, ''));
            }
        } while (match);
        let beauty = [];
        for (let idx = 0; idx < traces.length; idx++){
            match = null;
            try {
                let errPos;
                do {
                    match = RegexFileNames.exec(traces[idx]);
                    if (match){
                        errPos = match[0];
                    }
                } while (match);
                let data = (  new RegExp(/[^/\\&\?]+\.\w{2,4}(?::\d+:?\d{1,})(?=([\?&].*$|$))/igm).exec(errPos.replace(/[()]/ig, ''))  )[0].split(':');
                
                beauty.push({
                    Source: String(traces[idx]).replace(errPos, ''),
                    File: data[(data.length > 2 ? data.length - 3 : 0)],
                    Line: data[(data.length > 2 ? data.length - 1 : 1)]
                });
            } catch(e){}
        }

        console.log(`%c[%cINFO%c] %cUma exceção não-tratada ocorreu, veja mais informações abaixo.`, 'font-weight: bold;', 'font-weight: bold; color: green;', 'font-weight: bold; color: inherit;', 'font-weight: bold; color: inherit;');
        console.log(`%c[%cERRO%c] %c${message}`, 'font-weight: bold;', 'font-weight: bold; color: red;', 'font-weight: bold; color: inherit;', 'font-weight: bold; color: inherit;');
        console.log(`%c[%cRASTREIO%c] %cO erro foi rastreado até a sua origem, conforme a tabela a seguir:`, 'font-weight: bold;', 'font-weight: bold; color: orange;', 'font-weight: bold; color: inherit;', 'font-weight: bold; color: inherit;');
        console.table(beauty[0]);
        console.log(`%c[%cRASTREIO%c] %cTodos os locais afetados pelo erro (pilha de rastreio):`, 'font-weight: bold;', 'font-weight: bold; color: orange;', 'font-weight: bold; color: inherit;', 'font-weight: bold; color: inherit;');
        console.table(beauty);

        return UniversalHandler.runCatcher(err, {
            Message: message,
            Trace: beauty,
            Time: (new Date().toLocaleDateString()) + ' ' + (new Date().toLocaleTimeString())
        });
    }

}