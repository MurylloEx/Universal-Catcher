<h1 align="center">Universal Catcher</h1>
<p align="center">This library was designed to shows errors in a beautiful and presentable way with detailed information about the angular errors.</p>

<p align="center">
  <img src="https://badgen.net/npm/v/@rebase-team/universal-catcher"/> 
  <img src="https://badgen.net/npm/dt/@rebase-team/universal-catcher"/>
  <img src="https://badgen.net/npm/license/@rebase-team/universal-catcher"/>
  <img src="https://badgen.net/npm/types/@rebase-team/universal-catcher"/>
  <img src="https://badgen.net/badge/author/MurylloEx/red?icon=label"/>
</p>

You will need (>= Angular 9) to use this library and an Ionic project (>= v3).

## Installation

```sh
npm install @rebase-team/universal-catcher
```

## Usage examples

``> APP.MODULE.TS``
```typescript
import { AppComponent } from "./app.component";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { UniversalCatcherService, UniversalHandler } from "@rebase-team/universal-catcher";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot()
  ],
  providers: [
    UniversalCatcherService,
    { provide: ErrorHandler, useClass: UniversalHandler }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

```

``> HOME.PAGE.TS``
```typescript
import { Component, OnInit } from "@angular/core";
import { WebSettingsService, WebResponses, WebRequestsService } from "@rebase-team/lib-aluno-upe";
import { Storage } from "@ionic/storage";
import { ValidatorService } from "src/app/services/validator.service";
import { NavController } from "@ionic/angular";
import { CryptoService } from "src/app/services/crypto.service";
import { DefineUserService } from "src/app/services/define-user.service";
import { DataUserService } from "src/app/services/data-user.service";
import { AlertService } from "src/app/services/alert.service";
import { UniversalCatcherService } from "@rebase-team/universal-catcher";
import { UpdateVersionService } from "src/app/services/update-version.service";
import { AppModule } from 'src/app/app.module';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

  constructor(private catcherService: UniversalCatcherService) {
    //Set the Error Catcher handler and get the error in Angular way (_ngErr)
    //and error in Universal Catcher way (ucErr).
    //Enjoy the library :)
    this.catcherService.setErrorCatcher = (_ngErr, ucErr) => {
      console.log(`Error message: ${ucErr.Message}`);
      console.log(`Error time: ${ucErr.Time}`);
      console.log(`Error file name: ${ucErr.Trace[0].File}`);
      console.log(`Error source code line: ${ucErr.Trace[0].Line}`);
      console.log(`Caused by: ${ucErr.Trace[0].Source}`);
    };
  }

}
```

## Output in Developer Tools (Chrome, Mozilla, Opera)

<p align="center">
  <img alt="Screenshot" src="https://user-images.githubusercontent.com/32225687/103185406-138bec80-489b-11eb-9fa6-a7fb3f23f202.png"/>
</p>

## Metadata

Muryllo Pimenta de Oliveira – muryllo.pimenta@upe.br

Distribuído sobre a licença MIT. Veja ``LICENSE`` para mais informações.

## Contributing

1. Fork it (<https://github.com/MurylloEx/Universal-Catcher/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

