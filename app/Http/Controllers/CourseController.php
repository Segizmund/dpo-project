<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cache;

class CourseController extends Controller
{
    protected $config;

    public function __construct()
    {
        $this->config = config('services.external_api');
    }

    public function index(Request $request)
    {
        $limit = $request->input('limit', 9);

        $allExternalData = [];

        $responses = Http::pool(fn (Pool $pool) => [
            $pool->as('it')->withoutVerifying()->withHeaders(['X-API-KEY' => $this->config['key']])
                ->get($this->config['url'] . '/course/public', ['course_tag' => 'Войти в IT']),
            
            $pool->as('zero')->withoutVerifying()->withHeaders(['X-API-KEY' => $this->config['key']])
                ->get($this->config['url'] . '/course/public', ['course_tag' => 'Войти в IT с нуля']),

            $pool->as('skill')->withoutVerifying()->withHeaders(['X-API-KEY' => $this->config['key']])
                ->get($this->config['url'] . '/course/public', ['course_tag' => 'Освоить навык']),
        ]);


        return Inertia::render('Welcome', [
            'entry'      => (isset($responses['it']) && $responses['it']->ok()) ? $responses['it']->json() : [],
            'helpChoose' => (isset($responses['zero']) && $responses['zero']->ok()) ? $responses['zero']->json() : [],
            'learnSkill' => (isset($responses['skill']) && $responses['skill']->ok()) ? $responses['skill']->json() : [],
            'seo' => fn() => [
                'title' => 'Главная',
                'description' => 'Добро пожаловать на платформу дополнительного профессионального образования. Обучаем IT-профессиям и современным методикам педагогики.',
            ]
        ]);
    }

    public function webinars(Request $request)
    {
        $type = $request->query('type', 'free');
        
        if (!in_array($type, ['free', 'paid'])) {
            $type = 'free';
        }
        
        $cursor = $request->input('cursor'); 
        $limit = $request->input('limit', 3);

        try {
            $response = Http::withoutVerifying()
                ->timeout(10)
                ->withHeaders([
                    'X-API-KEY' => $this->config['key'],
                    'Accept'    => 'application/json',
                ])->get($this->config['url'] . '/webinar/public/', [
                    'limit' => (int) $limit,
                    'next_cursor' => $cursor,
                ]);

            $data = $response->successful() 
                ? $response->json() 
                : ['webinars' => [], 'next_cursor' => null];

        } catch (\Exception $e) {
            \Log::error("Webinars API Error: " . $e->getMessage());
            $data = ['webinars' => [], 'next_cursor' => null];
        }

        $seoData = $type === 'free' ? [
            'title' => 'Бесплатные вебинары',
            'description' => 'Смотрите бесплатные уроки от экспертов.',
        ] : [
            'title' => 'Платные вебинары',
            'description' => 'Углубленные программы обучения с практикой и обратной связью от менторов.',
        ];

        return Inertia::render('Webinars', [
            'webinars'   => $data['webinars'] ?? [],
            'nextCursor' => $data['next_cursor'] ?? null,
            'seo' => fn() => $seoData,
            'type' => $type
        ]);
    }

    public function loadMoreWebinars(Request $request)
    {
        $cursor = $request->input('cursor');
        $limit = $request->input('limit', 3);

        try {
            $response = Http::withoutVerifying()
                ->timeout(10)
                ->withHeaders([
                    'X-API-KEY' => $this->config['key'],
                    'Accept' => 'application/json',
                ])->get($this->config['url'] . '/webinar/public/', [
                    'limit' => (int) $limit,
                    'next_cursor' => $cursor,
                ]);

            $data = $response->successful() 
                ? $response->json() 
                : ['webinars' => [], 'next_cursor' => null];

            return response()->json([
                'webinars' => $data['webinars'] ?? [],
                'next_cursor' => $data['next_cursor'] ?? null,
            ]);

        } catch (\Exception $e) {
            \Log::error("Webinars API Error: " . $e->getMessage());
            return response()->json([
                'webinars' => [],
                'next_cursor' => null,
            ], 500);
        }
    }

    public function courses(Request $request)
    {
        $limit = $request->input('limit', 6);

        try {
            $response = Http::withoutVerifying()
                ->withHeaders([
                    'X-API-KEY' => $this->config['key'],
                    'Accept'    => 'application/json',
                ])
                ->get($this->config['url'] . '/course/public/tags', [
                    'limit' => $limit
                ]);

            $tags = $response->ok() ? $response->json() : [];
        } catch (\Exception $e) {
            $tags = [];
            Log::error("Failed to fetch tags: " . $e->getMessage());
        }

        return Inertia::render('Courses', [
            'tags' => $tags,
            'seo' => [
                'title' => 'Каталог всех курсов',
                'description' => 'Выберите подходящий курс: от разработки на Laravel до инклюзивного образования.',
            ]
        ]);
    }

    public function getCoursesByTag(Request $request)
    {
        $tag = $request->input('tag');
        
        if (!$tag) {
            return response()->json(['error' => 'Tag is required'], 400);
        }
        
        try {
            $response = Http::withoutVerifying()
                ->timeout(30)
                ->withHeaders(['X-API-KEY' => $this->config['key']])
                ->get($this->config['url'] . '/course/public', [
                    'course_tag' => $tag
                ]);
            
            if ($response->ok()) {
                $courses = $response->json();
                
                Log::info("Loaded " . count($courses) . " courses for tag: {$tag}");
                
                return response()->json($courses);
            }
            
            return response()->json(['error' => 'Failed to fetch courses'], $response->status());
            
        } catch (\Exception $e) {
            Log::error("Error fetching courses by tag {$tag}: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function courseShow(Request $request, $id)
    {
        try {
            $response = Http::withoutVerifying()
                ->withHeaders([
                    'X-API-KEY' => $this->config['key'],
                    'Accept'    => 'application/json',
                ])
                ->get($this->config['url'] . '/course/public/' . $id);

            $course = $response->ok() ? $response->json() : [];
        } catch (\Exception $e) {
            $course = [];
            Log::error("Failed to fetch course: " . $e->getMessage());
        }

        return Inertia::render('CourseShow', [
            'course' => $course,
            'seo' => fn() => [
                'title' => is_array($course) && isset($course['name']) ? $course['name'] : 'Курс',
                'description' => is_array($course) && isset($course['description']) ? $course['description'] : 'Информация о курсе',
            ]
        ]);
    }

    public function webinarShow(Request $request)
    {
        return Inertia::render('WebinarShow', [
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
