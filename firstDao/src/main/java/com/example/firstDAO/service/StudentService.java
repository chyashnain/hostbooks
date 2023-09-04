package com.example.firstDAO.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.firstDAO.dao.StudentDao;
import com.example.firstDAO.entity.StudentEntity;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StudentService {
	@Autowired
	private StudentDao stdDao;

	public StudentEntity addstudent(StudentEntity stdEntity) {
		stdDao.addstudent(stdEntity);
		return stdEntity;
	}

//	public StudentEntity getStudentById(int id) {
//		return stdDao.getStudentById(id);
//	}
//
//	public List<StudentEntity> getAllStudent() {
//		return stdDao.getAllStudent();
//	}

	public void updateStudent(int id, StudentEntity updatedStudent) {
		StudentEntity existingStudent = stdDao.getStudentById(id);
		if (existingStudent != null) {
			existingStudent.setName(updatedStudent.getName());
			existingStudent.setEmail(updatedStudent.getEmail());
			existingStudent.setPassword(updatedStudent.getPassword());

			stdDao.updateStudent(existingStudent);
		}
	}

	public void deleteStudent(int id) {
		stdDao.deleteStudent(id);
	}

//	public List<StudentEntity> getStudentList(int page, int size) {
//		return stdDao.getStudentList(page, size);
//	}

	public Long getTotalStudentCount() {
		return stdDao.getTotalStudentCount();
	}
//	public List<StudentEntity> getSortedStudentList(int page, int size, String sortField) {
//	    return stdDao.getSortedStudentList(page, size, sortField);
//	}
	public List<StudentEntity> getSortedStudentList(int page, int size, String sortField, boolean isAscending) {
	    return stdDao.getSortedStudentList(page, size, sortField,isAscending);
	}
	
	public List<StudentEntity> searchStudents(String query) {
	    return stdDao.searchStudents(query);
	}


	
}
