package com.ouatson.tontine.Utilisateurs;

import com.ouatson.tontine.Tontine.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User enregisterUser(User user){
        return userRepository.save(user);
    }

    public User rechercheUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User rechercheUser(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User rechercheUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Utilisateur d'identifiant "+id+" non trouve !"));
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
