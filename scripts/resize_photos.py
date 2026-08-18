"""Resize selected 糖巢 photos into public/photos for the static site.

One-off script. Originals in 照片素材 stay untouched. Photos are resized to a
per-item max edge and JPEG quality (hero/section bgs bigger, gallery smaller).
"""
import os
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE = r'D:\新文科大赛\照片素材'
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'photos')

# (output name, source folder, source file, max_edge, quality)
MANIFEST = [
    # Existing section backgrounds (keep 2560 / 82)
    ('hero-drone.jpg',      '【佳能200DII】嫑艺术空间｜吴文波采访照片', 'dji_mimo_20260714_172008_20260714172007_1784031165648_photo.jpg', 2560, 82),
    ('about-food.jpg',      '【佳能200DII】客家李记照片',               'IMG_2775.jpg',                                               2560, 82),
    ('about-center.jpg',    '【佳能r50】糖巢创客中心照片',               'DLY_6046.JPG',                                               2560, 82),
    ('space-art.jpg',       '【佳能200DII】嫑艺术空间｜吴文波采访照片',   'IMG_2726.jpg',                                               2560, 82),
    ('space-food.jpg',      '【佳能200DII】客家李记照片',               'IMG_2794.JPG',                                               2560, 82),
    ('space-village.jpg',   '【佳能r50】南园古村照片',                   'IMG_2604.JPG',                                               2560, 82),
    ('maker-space.jpg',     '【佳能rp】糖巢创客空间照片',               'IMG_0009.JPG',                                               2560, 82),
    ('center-extra.jpg',    '【佳能r50】糖巢创客中心照片',               'IMG_3967.JPG',                                               2560, 82),
    # Hero theme images
    ('river.jpg',           '【佳能200DII】嫑艺术空间｜吴文波采访照片',   'dji_mimo_20260714_171952_20260714171953_1784031165978_photo.jpg', 2560, 82),
    ('night.jpg',           '【佳能r50】糖巢创客中心照片',               'IMG_4008.JPG',                                               2560, 82),
    # Creators portraits (2560 / 82)
    ('creator-li.jpg',      '【佳能200DII】客家李记照片',               'IMG_2799.JPG',                                               2560, 82),
    ('creator-wu.jpg',      '【佳能200DII】嫑艺术空间｜吴文波采访照片',   'IMG_2725.jpg',                                               2560, 82),
    ('creator-xu.jpg',      '【佳能r50】糖巢创客中心照片',               'IMG_4009.JPG',                                               2560, 82),
    # Gallery tiles (1600 / 78)
    ('gal-art-1.jpg',       '【佳能200DII】嫑艺术空间｜吴文波采访照片',   'IMG_2714.jpg',                                               1600, 78),
    ('gal-art-2.jpg',       '【佳能200DII】嫑艺术空间｜吴文波采访照片',   'IMG_2741.jpg',                                               1600, 78),
    ('gal-food-1.jpg',      '【佳能200DII】客家李记照片',               'IMG_2782.jpg',                                               1600, 78),
    ('gal-food-2.jpg',      '【佳能200DII】客家李记照片',               'IMG_2790.jpg',                                               1600, 78),
    ('gal-village-1.jpg',   '【佳能r50】南园古村照片',                   'IMG_2582.JPG',                                               1600, 78),
    ('gal-village-2.jpg',   '佳能rp 南园古村 7.17',                     'IMG_0054.JPG',                                               1600, 78),
    ('gal-center-1.jpg',    '【佳能r50】糖巢创客中心照片',               'DLY_6123.JPG',                                               1600, 78),
    ('gal-center-2.jpg',    '【佳能r50】糖巢创客中心照片',               'IMG_3968.JPG',                                               1600, 78),
    ('gal-maker-1.jpg',     '【佳能rp】糖巢创客空间照片',               'IMG_0010.JPG',                                               1600, 78),
    ('gal-maker-2.jpg',     '【佳能rp】糖巢创客空间照片',               'IMG_0030.JPG',                                               1600, 78),
    ('gal-drone.jpg',       '【佳能200DII】嫑艺术空间｜吴文波采访照片',   'dji_mimo_20260714_171952_20260714171953_1784031165978_photo.jpg', 1600, 78),
    # Business theme images (root of 照片素材, folder = '__ROOT__', 1200 / 80)
    ('biz-maker.jpg',       '__ROOT__', '创客.jpg',                                                      1200, 80),
    ('biz-study.jpg',       '__ROOT__', '研学.jpg',                                                      1200, 80),
    ('biz-craft.jpg',       '__ROOT__', '文创.jpg',                                                      1200, 80),
    ('biz-exp.jpg',         '__ROOT__', '体验.jpg',                                                      1200, 80),
    ('biz-food.jpg',        '__ROOT__', '美食.jpg',                                                      1200, 80),
    ('biz-wedding.jpg',     '__ROOT__', '婚庆.jpg',                                                      1200, 80),
    ('biz-holiday.jpg',     '__ROOT__', '度假.jpg',                                                      1200, 80),
    ('biz-street.jpg',      '__ROOT__', '街拍.jpg',                                                      1200, 80),
]


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    total = 0
    for name, folder, src, max_edge, quality in MANIFEST:
        path = os.path.join(BASE, src) if folder == '__ROOT__' else os.path.join(BASE, folder, src)
        if not os.path.exists(path):
            print(f'!! missing: {name} <- {path}')
            continue
        im = Image.open(path)
        im = im.convert('RGB')
        im.thumbnail((max_edge, max_edge), Image.LANCZOS)
        dest = os.path.join(OUT, name)
        im.save(dest, 'JPEG', quality=quality, optimize=True, progressive=True)
        kb = os.path.getsize(dest) // 1024
        total += kb
        print(f'  {name:18s} {im.size[0]}x{im.size[1]:<5d} {kb} KB')
    print(f'  TOTAL: {total} KB')


if __name__ == '__main__':
    main()
