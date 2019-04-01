import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    public usuariosService: UsuarioService
  ) { }

  // @Effect()
  // cargarUsuarios$ = this.actions$
  //   .pipe(
  //     ofType( usuariosActions.CARGAR_USUARIOS ),
  //         switchMap( () => {
  //           return this.usuariosService.getUsers()
  //             .pipe(
  //               map( users => new usuariosActions.CargarUsuariosSuccess( users ) ),
  //               catchError( error => of(new usuariosActions.CargarUsuariosFail( error )) )
  //             );
  //         }))

@Effect()
cargarUsuarios$ = this.actions$
    .pipe(
      ofType( usuarioActions.CARGAR_USUARIO ),
      switchMap( (action: usuarioActions.CargarUsuario ) => this.usuariosService.getUserById(action.id)
        .pipe(
          map( user => new usuarioActions.CargarUsuarioSuccess( user )),
          catchError( error => of( new usuarioActions.CargarUsuarioFail( error ))
          ))
          )
    );
}
