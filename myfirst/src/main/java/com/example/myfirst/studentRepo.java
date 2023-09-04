package com.example.myfirst;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface studentRepo extends JpaRepository<student, Integer> {

	student findByName(String name);


}
