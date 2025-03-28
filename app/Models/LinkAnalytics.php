<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkAnalytics extends Model
{
    use HasFactory;
    protected $fillable = ['link_id', 'ip_address', 'device', 'browser', 'location'];
    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
