package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Medicine;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer>, JpaSpecificationExecutor<Medicine> {
    boolean existsByMedicineName(String medicineName);

    Optional<Medicine> findByMedicineName(String medicineName);

    Optional<Medicine> findByMedicineId(int medicineId);

    List<Medicine> findAll(Specification<Medicine> spec, Sort sort);

    @Query("SELECT m FROM Medicine m LEFT JOIN FETCH m.medicineAttributes ma LEFT JOIN FETCH ma.attribute WHERE m.medicineId = :medicineId")
    Optional<Medicine> findByIdWithAttributes(@Param("medicineId") int medicineId);

    // @Query("SELECT m FROM Medicine m JOIN m.categories c WHERE c IN :values")
    // List<Medicine> findByCategoriesIn(@Param("values") List<String> values);
}
