<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [CourseController::class, 'index'])->name('home');

Route::get('/webinars', [CourseController::class, 'webinars'])->name('webinars');;
Route::get('/webinars/{id}', [CourseController::class, 'webinarShow'])->name('webinar.show');
Route::get('/webinars/load-more', [CourseController::class, 'loadMoreWebinars'])->name('webinars.load-more');

Route::get('/courses', [CourseController::class, 'courses'])->name('courses');
Route::get('/courses/by-tag', [CourseController::class, 'getCoursesByTag'])->name('courses.by-tag');
Route::get('/courses/{id}', [CourseController::class, 'courseShow'])->name('course.show');

Route::get('/about-us', [CourseController::class, 'aboutUs'])->name('about-us');
Route::get('/contacts', [CourseController::class, 'contacts'])->name('contacts');