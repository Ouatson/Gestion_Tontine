package com.ouatson.backtontine.Utilisateurs;

import com.ouatson.backtontine.SendEmail.EmailSenderService;
import com.ouatson.backtontine.Tontine.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Collection;
import java.util.UUID;

@RestController
public class UserController {
    BCryptPasswordEncoder encode = new BCryptPasswordEncoder(12);

    @Autowired
    private UserService userService;

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/enregistrer")
    public ResponseEntity<User> userRegister(@RequestBody User user) throws Exception{
        User nouvelUtilisateur = userService.enregisterUser(user);
        if (nouvelUtilisateur == null) {
            throw new Exception("Un utilisateur avec cet email existe déjà !");
        }
        return new ResponseEntity<>(nouvelUtilisateur, HttpStatus.CREATED);
    }

    @PostMapping("/connexion")
    public ResponseEntity<User> userLogin(@RequestBody User user) throws Exception{
        User bonUser = userService.connexion(user);
        if (bonUser == null){
            throw new Exception("Les informations fournies ne sont pas correctes !");
        }
        return new ResponseEntity<>(bonUser, HttpStatus.OK);
    }

    //    Partie pour l'oubli du mot de passe
    @PostMapping("/oubli-password")
    public void oubliPassword(@RequestBody String email) throws Exception {
        User existingUser = userService.rechercheUserByEmail(email);
        if (existingUser != null) {
            existingUser.setConfirmationToken(UUID.randomUUID().toString());
            userService.modifierUser(existingUser);
            String url = "http://localhost:8080/confirm-reset?token=";
            String text = "Pour réinitialiser votre mot de passe, cliquer sur le lien suivant "+url+existingUser.getConfirmationToken();
            emailSenderService.sendSimpleEmail(existingUser.getEmail(),
                    text,
                    "Confirmation Réinitialisation");
        } else {
            throw new Exception("Aucun compte avec cet email");
        }
    }

    @GetMapping("/confirm-reset")
    public RedirectView confirmation(@RequestParam("token") String token) throws Exception {
        User user = userService.rechercheUserByToken(token);
        if (user == null){
            throw new Exception("Ce lien n'est pas valide !");
        } else {
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl("http://localhost:4200/change-mot-de-passe?email="+user.getEmail());
            return redirectView;
        }
    }

    @PutMapping("/reinitialiser/{email}")
    public ResponseEntity<User> reinitialiserPassword(@PathVariable("email") String email, @RequestBody String password) throws Exception {
        User user = userService.rechercheUserByEmail(email);
        if (user != null){
            user.setPassword(encode.encode(password));
            user.setConfirmationToken(null);
            userService.modifierUser(user);
        } else {
            throw new Exception("Aucun compte avec cet email");
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    //    Fin partie oubli

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
