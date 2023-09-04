//	@GetMapping("/get/{id}")
//	public ResponseEntity<StudentEntity> getStudentById(@PathVariable int id) {
//		StudentEntity user = stdService.getStudentById(id);
//		if (user != null) {
//			return ResponseEntity.ok(user);
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}
//
//	@GetMapping("/get/all")
//	public ResponseEntity<List<StudentEntity>> getAllStudent() {
//		List<StudentEntity> users = stdService.getAllStudent();
//		return ResponseEntity.ok(users);
//	}
	
	//pagination
//		 @GetMapping("/page")
//		    public ResponseEntity<List<StudentEntity>> getStudentList(
//		            @RequestParam int page,
//		            @RequestParam int size) {
//		        List<StudentEntity> students = stdService.getStudentList(page, size);
//		        return ResponseEntity.ok(students);
//		    }
		 
		//simple sorting
//		@GetMapping("/sorted")
//		public ResponseEntity<List<StudentEntity>> getSortedStudentList(
//		        @RequestParam int page,
//		        @RequestParam int size,
//		        @RequestParam String sortField) {
//		    List<StudentEntity> students = stdService.getSortedStudentList(page, size, sortField);
//		    return ResponseEntity.ok(students);
//		}
		
		// by ascending descending


package com.example.firstDAO.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.firstDAO.entity.StudentEntity;
import com.example.firstDAO.service.StudentService;

@CrossOrigin("*")
@RestController
@RequestMapping("students")
public class StudentController {
	@Autowired
	private StudentService stdService;

	@PostMapping("/add")
	public ResponseEntity<String> addstudent(@RequestBody StudentEntity std) {
		stdService.addstudent(std);
		return ResponseEntity.ok("User added successfully");
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateStudent(@PathVariable int id, @RequestBody StudentEntity user) {
		stdService.updateStudent(id, user);
		return ResponseEntity.ok("User updated successfully");
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable int id) {
		stdService.deleteStudent(id);
		return ResponseEntity.ok("User deleted successfully");
	}

	@GetMapping("/count")
    public ResponseEntity<Long> getTotalStudentCount() {
        Long count = stdService.getTotalStudentCount();
        return ResponseEntity.ok(count);
    }
	
	@GetMapping("/sorted")
	public ResponseEntity<List<StudentEntity>> getSortedStudentList(
	        @RequestParam int page,
	        @RequestParam int size,
	        @RequestParam String sortField,
	        @RequestParam boolean isAscending) {
	    List<StudentEntity> students = stdService.getSortedStudentList(page, size, sortField,isAscending);
	    return ResponseEntity.ok(students);
	}

	 @GetMapping("/search")
	 public ResponseEntity<List<StudentEntity>> searchStudents(@RequestParam String query) {
	     List<StudentEntity> matchingStudents = stdService.searchStudents(query);
	     return ResponseEntity.ok(matchingStudents);
	 }

}
