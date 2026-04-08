<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cache;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 9);
        $config = Config::get('services.external_api');

        /*$externalData = Cache::remember("webinars_list_{$limit}", 300, function () use ($config, $limit) {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $config['key'],  // 'X-API-KEY' => $config['key']
                'Accept' => 'application/json',
            ])->get($config['url'], [
                'per_page' => $limit,
            ]);

            return $response->json() ?? ['data' => [], 'total' => 0];
        });*/


        return Inertia::render('Welcome', [
            /*'webinars' => $externalData['data'] ?? [],
            'totalCount' => $externalData['total'] ?? 0,
            'currentLimit' => (int) $limit,*/
            'seo' => [
                'title' => 'Главная',
                'description' => 'Добро пожаловать на платформу дополнительного профессионального образования. Обучаем IT-профессиям и современным методикам педагогики.',
            ]
        ]);
    }

    public function webinars_free(Request $request)
    {
        return Inertia::render('Webinars', [
            'seo' => [
                'title' => 'Бесплатные вебинары',
                'description' => 'Смотрите бесплатные уроки от экспертов. Разбираем вход в IT, новые фишки Laravel и методы цифрового образования.',
            ],
            'type' => 'free'
        ]);
    }

    public function webinars_paid(Request $request)
    {
        return Inertia::render('Webinars', [
            'seo' => [
                'title' => 'Платные вебинары',
                'description' => 'Углубленные программы обучения с практикой и обратной связью от менторов.',
            ],
            'type' => 'paid'
        ]);
    }
    
    public function courses(Request $request)
    {
        return Inertia::render('Courses', [
            'seo' => [
                'title' => 'Каталог всех курсов',
                'description' => 'Выберите подходящий курс: от разработки на Laravel до инклюзивного образования.',
            ]
        ]);
    }

    public function contacts()
    {
        return Inertia::render('Contacts', [
            'seo' => [
                'title' => 'Контакты',
                'description' => 'Контакты для свзяи с ДПО.',
            ] 
        ]);
    }

    public function aboutUs()
    {
        return Inertia::render('AboutUs', [
            'seo' => [
                'title' => 'О нас',
                'description' => 'Информация про дополнительное профессиональное образование в Мелитополе, актуальная информация про проект',
            ]
        ]);
    }
}
