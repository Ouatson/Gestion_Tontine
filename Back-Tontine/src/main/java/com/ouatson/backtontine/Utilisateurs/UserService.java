package com.ouatson.backtontine.Utilisateurs;

import com.ouatson.backtontine.Tontine.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class UserService {
    BCryptPasswordEncoder encode = new BCryptPasswordEncoder(12);

    @Autowired
    private UserRepository userRepository;

    public User enregisterUser(User user){
        User userObj = userRepository.findByEmail(user.getEmail());
        if (userObj != null) {
            return null;
        } else {
            user.setPassword(encode.encode(user.getPassword()));
            return userRepository.save(user);
        }
    }

    public User connexion(User user){
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            if (encode.matches(user.getPassword(), existingUser.getPassword())) {
                return existingUser;
            } else return null;
        } else return null;
    }

    public User rechercheUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User rechercheUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Utilisateur d'identifiant "+id+" non trouve !"));
    }

    public User rechercheUserByToken(String confirmToken) {
        return userRepository.findByConfirmationToken(confirmToken);
    }

    public User modifierUser(User user){
        return userRepository.save(user);
    }

    public Collection<Tontine> mestontines(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Utilisateur d'identifiant "+id+" non trouve !"));
        return user.getTontine();
    }

    @Transactional
    public void supprimerUserById(Long id){
        userRepository.deleteById(id);
    }

}
