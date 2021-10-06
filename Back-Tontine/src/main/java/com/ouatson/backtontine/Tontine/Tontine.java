package com.ouatson.backtontine.Tontine;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ouatson.backtontine.Demandes.Demandes;
import com.ouatson.backtontine.Participants.Participant;
import com.ouatson.backtontine.Tontine.HistoriqueTirage.Tirages;
import com.ouatson.backtontine.Utilisateurs.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Tontine implements Serializable {
    public enum Tirage{
        Jours, Semaines, Mois
    }

    public enum TypeTirage{
        OrdreArrivee, Aleatoire, Choix
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false, updatable = false)
    private String code;
    private String nom;
    private int nombrePart;
    private Long montant;
    @Enumerated(EnumType.STRING)
    private Tirage tirage;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private int periodicite;
    @Enumerated(EnumType.STRING)
    private TypeTirage typeTirage;
    private String description;
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private User proprietaire;
    @OneToMany(mappedBy = "tontine")
    private Collection<Participant> participant;
    @OneToMany(mappedBy = "tontine")
    private Collection<Demandes> demandes;
    @OneToMany(mappedBy = "tontine")
    private Collection<Tirages> tirages;


    public Tontine() {
    }

    public Tontine(Long id,
                   String code,
                   String nom,
                   int nombrePart,
                   Long montant,
                   Tirage tirage,
                   LocalDate dateDebut,
                   LocalDate dateFin,
                   int periodicite,
                   TypeTirage typeTirage,
                   String description,
                   User proprietaire) {
        this.id = id;
        this.code = code;
        this.nom = nom;
        this.nombrePart = nombrePart;
        this.montant = montant;
        this.tirage = tirage;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.periodicite = periodicite;
        this.typeTirage = typeTirage;
        this.description = description;
        this.proprietaire = proprietaire;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getNombrePart() {
        return nombrePart;
    }

    public void setNombrePart(int nombrePart) {
        this.nombrePart = nombrePart;
    }

    public Long getMontant() {
        return montant;
    }

    public void setMontant(Long montant) {
        this.montant = montant;
    }

    public Tirage getTirage() {
        return tirage;
    }

    public void setTirage(Tirage tirage) {
        this.tirage = tirage;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public int getPeriodicite() {
        return periodicite;
    }

    public void setPeriodicite(int periodicite) {
        this.periodicite = periodicite;
    }

    public TypeTirage getTypeTirage() {
        return typeTirage;
    }

    public void setTypeTirage(TypeTirage typeTirage) {
        this.typeTirage = typeTirage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getProprietaire() {
        return proprietaire;
    }

    public void setProprietaire(User proprietaire) {
        this.proprietaire = proprietaire;
    }

    public Collection<Participant> getParticipant() {
        return participant;
    }

    public void setParticipant(Collection<Participant> participant) {
        this.participant = participant;
    }

    public Collection<Demandes> getDemandes() { return demandes; }

    public void setDemandes(Collection<Demandes> demandes) { this.demandes = demandes; }

    public Collection<Tirages> getTirages() { return tirages; }

    public void setTirages(Collection<Tirages> tirages) { this.tirages = tirages; }

    @Override
    public String toString() {
        return "Tontine{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", nom='" + nom + '\'' +
                ", nombrePart=" + nombrePart +
                ", montant=" + montant +
                ", tirage=" + tirage +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", periodicite=" + periodicite +
                ", typeTirage=" + typeTirage +
                ", description='" + description + '\'' +
                ", proprietaire=" + proprietaire +
                ", participant=" + participant +
                ", demandes=" + demandes +
                ", tirages=" + tirages +
                '}';
    }
}