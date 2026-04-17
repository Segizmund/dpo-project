<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [CourseController::class, 'index'])->name('home');

Route::get('/webinars-free', [CourseController::class, 'webinars_free'])->name('webinars-free');
Route::get('/webinars-paid', [CourseController::class, 'webinars_paid'])->name('webinars-paid');
Route::get('/webinars/{id}/show', [CourseController::class, 'webinarShow'])->name('webinar.show');

Route::get('/courses', [CourseController::class, 'courses'])->name('courses');
Route::get('/courses/{id}/show', [CourseController::class, 'courseShow'])->name('course.show');

Route::get('/about-us', [CourseController::class, 'aboutUs'])->name('about-us');
Route::get('/contacts', [CourseController::class, 'contacts'])->name('contacts');