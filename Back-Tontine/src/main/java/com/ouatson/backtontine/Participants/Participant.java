package com.ouatson.backtontine.Participants;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ouatson.backtontine.Tontine.Tontine;
import com.ouatson.backtontine.Versement.Versement;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Participant implements Serializable {
    public enum Sexe{
        Masculin,Feminin
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private LocalDate dateNaiss;
    private String adresse;
    private String numTel;
    private String profession;
    @Enumerated(EnumType.STRING)
    private Sexe sexe;
    private String status_matrimonial;
    private String probleme;
    private String telprobleme;
    private Long mise_montant;
    private int retard;
    private boolean tirage;
    private Date date_versement;
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Tontine tontine;
    @OneToMany(mappedBy = "participant")
    private List<Versement> versements;

    public Participant() {
    }

    public Participant(Long id, String nom, String prenom, String email, LocalDate dateNaiss, String adresse, String numTel, String profession, Sexe sexe, String status_matrimonial, String probleme, String telprobleme, Long mise_montant, int retard, boolean tirage, Date date_versement, Tontine tontine) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.dateNaiss = dateNaiss;
        this.adresse = adresse;
        this.numTel = numTel;
        this.profession = profession;
        this.sexe = sexe;
        this.status_matrimonial = status_matrimonial;
        this.probleme = probleme;
        this.telprobleme = telprobleme;
        this.mise_montant = mise_montant;
        this.retard = retard;
        this.tirage = tirage;
        this.date_versement = date_versement;
        this.tontine = tontine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateNaiss() {
        return dateNaiss;
    }

    public void setDateNaiss(LocalDate dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public String getStatus_matrimonial() {
        return status_matrimonial;
    }

    public void setStatus_matrimonial(String status_matrimonial) {
        this.status_matrimonial = status_matrimonial;
    }

    public String getProbleme() {
        return probleme;
    }

    public void setProbleme(String probleme) {
        this.probleme = probleme;
    }

    public String getTelprobleme() {
        return telprobleme;
    }

    public void setTelprobleme(String telprobleme) {
        this.telprobleme = telprobleme;
    }

    public Long getMise_montant() {
        return mise_montant;
    }

    public void setMise_montant(Long mise_montant) {
        this.mise_montant = mise_montant;
    }

    public int getRetard() {
        return retard;
    }

    public void setRetard(int retard) {
        this.retard = retard;
    }

    public boolean isTirage() {
        return tirage;
    }

    public void setTirage(boolean tirage) {
        this.tirage = tirage;
    }

    public Date getDate_versement() {
        return date_versement;
    }

    public void setDate_versement(Date date_versement) {
        this.date_versement = date_versement;
    }

    public Tontine getTontine() {
        return tontine;
    }

    public void setTontine(Tontine tontine) {
        this.tontine = tontine;
    }

    public List<Versement> getVersements() { return versements; }

    public void setVersements(List<Versement> versements) { this.versements = versements; }

    @Override
    public String toString() {
        return "Participant{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", dateNaiss=" + dateNaiss +
                ", adresse='" + adresse + '\'' +
                ", numTel='" + numTel + '\'' +
                ", profession='" + profession + '\'' +
                ", sexe=" + sexe +
                ", status_matrimonial='" + status_matrimonial + '\'' +
                ", probleme='" + probleme + '\'' +
                ", telprobleme='" + telprobleme + '\'' +
                ", mise_montant=" + mise_montant +
                ", retard=" + retard +
                ", tirage=" + tirage +
                ", date_versement=" + date_versement +
                ", tontine=" + tontine +
                ", versements=" + versements +
                '}';
    }
}