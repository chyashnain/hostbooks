package com.example.firstDAO.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.firstDAO.entity.StudentEntity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;


@Repository
public class StudentDao {
	@Autowired
	private EntityManager entityManager;

	public StudentEntity addstudent(StudentEntity student) {
		entityManager.persist(student);
		return student;
	}

	public StudentEntity getStudentById(int id) {
		return entityManager.find(StudentEntity.class, id);
	}
//
//	public List<StudentEntity> getAllStudent() {
//		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//		CriteriaQuery<StudentEntity> cq = cb.createQuery(StudentEntity.class);
//		Root<StudentEntity> r = cq.from(StudentEntity.class);
//		CriteriaQuery<StudentEntity> all = cq.select(r);
//		TypedQuery<StudentEntity> allQuery = entityManager.createQuery(all);
//		return allQuery.getResultList();
//	}

	public void updateStudent(StudentEntity student) {
		entityManager.merge(student);
	}

	public void deleteStudent(int id) {
		StudentEntity stdEntity = entityManager.find(StudentEntity.class, id);
		if (stdEntity != null) {
			entityManager.remove(stdEntity);
		}
	}

//	public List<StudentEntity> getStudentList(int page, int size) {
//		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//		CriteriaQuery<StudentEntity> query = criteriaBuilder.createQuery(StudentEntity.class);
//		Root<StudentEntity> root = query.from(StudentEntity.class);
//
//		query.select(root);
//
//		TypedQuery<StudentEntity> typedQuery = entityManager.createQuery(query).setFirstResult(page * size)
//				.setMaxResults(size);
//
//		return typedQuery.getResultList();
//	}

	public Long getTotalStudentCount() {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = criteriaBuilder.createQuery(Long.class);
		Root<StudentEntity> root = query.from(StudentEntity.class);

		query.select(criteriaBuilder.count(root));

		return entityManager.createQuery(query).getSingleResult();
	}
	
//	public List<StudentEntity> getSortedStudentList(int page, int size, String sortField) {
//	    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//	    CriteriaQuery<StudentEntity> query = criteriaBuilder.createQuery(StudentEntity.class);
//	    Root<StudentEntity> root = query.from(StudentEntity.class);
//
//	    query.select(root);
//
//	    Path<Object> path = root.get(sortField);
//	    query.orderBy(criteriaBuilder.asc(path));
//
//	    TypedQuery<StudentEntity> typedQuery = entityManager.createQuery(query).setFirstResult(page * size)
//	            .setMaxResults(size);
//
//	    return typedQuery.getResultList();
//	}
	
	public List<StudentEntity> getSortedStudentList(int page, int size, String sortField,boolean isAscending) {
	    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	    CriteriaQuery<StudentEntity> query = criteriaBuilder.createQuery(StudentEntity.class);
	    Root<StudentEntity> root = query.from(StudentEntity.class);

	    query.select(root);

	    Path<Object> path = root.get(sortField);
	    if (isAscending) {
	        query.orderBy(criteriaBuilder.asc(path));
	    } else {
	        query.orderBy(criteriaBuilder.desc(path));
	    }

	    TypedQuery<StudentEntity> typedQuery = entityManager.createQuery(query).setFirstResult(page * size)
	            .setMaxResults(size);

	    return typedQuery.getResultList();
	}

	public List<StudentEntity> searchStudents(String query){
		CriteriaBuilder criteriabuilder=entityManager.getCriteriaBuilder();
		CriteriaQuery<StudentEntity> cq=criteriabuilder.createQuery(StudentEntity.class);
		Root<StudentEntity> root=cq.from(StudentEntity.class);
		cq.select(root);
		Predicate namepredicate=criteriabuilder.like(root.get("name"),"%"+query+"%");
		Predicate emailpredicate=criteriabuilder.like(root.get("email"),"%"+query+"%");
		
		Predicate searchpredicate=criteriabuilder.or(namepredicate,emailpredicate);
		cq.where(searchpredicate);
		TypedQuery<StudentEntity> typedQuery = entityManager.createQuery(cq);

	    return typedQuery.getResultList();
	} 

}