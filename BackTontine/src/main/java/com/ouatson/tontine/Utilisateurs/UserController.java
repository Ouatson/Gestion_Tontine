package com.ouatson.tontine.Utilisateurs;

import com.ouatson.tontine.Tontine.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/enregistrer")
    public ResponseEntity<User> userRegister(@RequestBody User user) throws Exception{
        String tempEmail = user.getEmail();
        if (tempEmail != null && !"".equals(tempEmail)){
            User userObj = userService.rechercheUserByEmail(tempEmail);
            if (userObj != null){
                throw new Exception("Un utilisateur avec pour email "+tempEmail+" existe déjà !");
            }
        }
        User nouvelUtilisateur = userService.enregisterUser(user);
        return new ResponseEntity<>(nouvelUtilisateur, HttpStatus.CREATED);
    }

    @PostMapping("/connexion")
    public User userLogin(@RequestBody User user) throws Exception{
        String tempEmail = user.getEmail();
        String tempPassword = user.getPassword();
        User user1 = null;
        if (tempEmail != null && tempPassword != null){
            user1 = userService.rechercheUser(tempEmail, tempPassword);
        }
        if (user1 == null){
            throw new Exception("Les informations fournies ne sont pas correctes !");
        }
        return user1;
    }

    @PutMapping("/modifier")
    public ResponseEntity<User> userModify(@RequestBody User user){
        User modifUser = userService.modifierUser(user);
        return new ResponseEntity<>(modifUser, HttpStatus.OK);
    }

    @GetMapping("/mestontines/{id}")
    public ResponseEntity<Collection<Tontine>> myTontines(@PathVariable("id") Long id){
        Collection<Tontine> tontines = userService.mestontines(id);
        return new ResponseEntity<>(tontines, HttpStatus.OK);
    }

    @GetMapping("/userI/{id}")
    public ResponseEntity<User> utilisateur(@PathVariable("id") Long id){
        User user = userService.rechercheUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/userE/{email}")
    public ResponseEntity<User> searchUserByEmail(@PathVariable("email") String email){
        User user = userService.rechercheUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> userDelete(@PathVariable("id") Long id){
        userService.supprimerUserById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
