package com.example.myfirst;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class studentService {
	
	@Autowired
	 private  studentRepo strepo;
	 
	 
	    public student savestudent(student student) {
	        return strepo.save(student);
	    }

	   

	    public List<student> getstudents(){
	        return strepo.findAll();
	    }

	    
	    public student getstudentById(int id){
	        return strepo.findById(id).orElse(null);
	    }

	    public String deletestudent(int id) {
	        strepo.deleteById(id);
	        return "Student Deleted || " + id;
	    }
	    public student updatestudent(int id, student updatedStudent) {
	        student existingStudent = strepo.findById(id).orElse(null);

	        if (existingStudent != null) {
	            existingStudent.setName(updatedStudent.getName()); // Update other fields as needed
	            existingStudent.setEmail(updatedStudent.getEmail());
	            existingStudent.setPassword(updatedStudent.getPassword());;
	            // Update other fields

	            return strepo.save(existingStudent);
	        }

	        return null; // Handle not found scenario
	    }

		
	}
