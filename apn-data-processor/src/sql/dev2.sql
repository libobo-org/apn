-- select
-- 	tnveds_part,
-- 	tnveds_count,
-- 	notes_count,
-- 	kol_avg,
-- 	cost_avg,
-- 	cast(cost_avg as decimal) / kol_avg as cost_by_one_avg,
-- 	kol_avg_2019,
-- 	cost_avg_2019,
-- 	kol_avg_2020,
-- 	cost_avg_2020,
-- 	kol_avg_2021,
-- 	cost_avg_2021
-- from (
-- 	select
-- 		SUBSTRING(id, 1, 2) as tnveds_part,
-- 		count(*) as tnveds_count
-- 	from tnveds
-- 	group by tnveds_part
-- ) as a3
-- left join
-- 	(select
-- 	 	tnveds_part as note_tnveds_part,
-- 		 count(*) as notes_count,
-- 		 avg(cost) as cost_avg,
-- 		 avg(kol) as kol_avg
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol
-- 		from notes
-- 	) as a1
-- 	group by tnveds_part) as a2
-- on tnveds_part = note_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2019_tnveds_part,
-- 	 	avg(kol) as kol_avg_2019,
-- 	 	avg(cost) as cost_avg_2019
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2019
-- 	) as b1
-- 	group by tnveds_part) as b2
-- on tnveds_part = notes2019_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2020_tnveds_part,
-- 	 	avg(kol) as kol_avg_2020,
-- 	 	avg(cost) as cost_avg_2020
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2020
-- 	) as c1
-- 	group by tnveds_part) as c2
-- on tnveds_part = notes2020_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2021_tnveds_part,
-- 	 	avg(kol) as kol_avg_2021,
-- 	 	avg(cost) as cost_avg_2021
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2021
-- 	) as d1
-- 	group by tnveds_part) as d2
-- on tnveds_part = notes2021_tnveds_part
-- order by tnveds_part asc;

-- select count(*)
-- from
-- (
-- select
-- 	tnveds_part,
-- 	tnveds_count,
-- 	notes_count,
-- 	kol_avg,
-- 	cost_avg,
-- 	cast(cost_avg as decimal) / kol_avg as cost_by_one_avg,
-- 	kol_avg_2019,
-- 	cost_avg_2019,
-- 	kol_avg_2020,
-- 	cost_avg_2020,
-- 	kol_avg_2021,
-- 	cost_avg_2021
-- from (
-- 	select
-- 		SUBSTRING(id, 1, 2) as tnveds_part,
-- 		count(*) as tnveds_count
-- 	from tnveds
-- 	group by tnveds_part
-- ) as a3
-- left join
-- 	(select
-- 	 	tnveds_part as note_tnveds_part,
-- 		 count(*) as notes_count,
-- 		 avg(cost) as cost_avg,
-- 		 avg(kol) as kol_avg
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol
-- 		from notes
-- 	) as a1
-- 	group by tnveds_part) as a2
-- on tnveds_part = note_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2019_tnveds_part,
-- 	 	avg(kol) as kol_avg_2019,
-- 	 	avg(cost) as cost_avg_2019
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2019
-- 	) as b1
-- 	group by tnveds_part) as b2
-- on tnveds_part = notes2019_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2020_tnveds_part,
-- 	 	avg(kol) as kol_avg_2020,
-- 	 	avg(cost) as cost_avg_2020
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2020
-- 	) as c1
-- 	group by tnveds_part) as c2
-- on tnveds_part = notes2020_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2021_tnveds_part,
-- 	 	avg(kol) as kol_avg_2021,
-- 	 	avg(cost) as cost_avg_2021
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 2) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2021
-- 	) as d1
-- 	group by tnveds_part) as d2
-- on tnveds_part = notes2021_tnveds_part
-- order by tnveds_part asc) as x1
-- -- where (kol_avg_2019 > kol_avg_2020 and kol_avg_2020 > kol_avg_2021) or (kol_avg_2019 < kol_avg_2020 and kol_avg_2020 < kol_avg_2021)
-- where (cost_avg_2019 > cost_avg_2020 and cost_avg_2020 > cost_avg_2021) or (cost_avg_2019 < cost_avg_2020 and cost_avg_2020 < cost_avg_2021)
-- -- RESULT: all=97, kol_rules=25, cost_rules=22

-- select count(*)
-- from
-- (
-- select
-- 	tnveds_part,
-- 	tnveds_count,
-- 	notes_count,
-- 	kol_avg,
-- 	cost_avg,
-- 	cast(cost_avg as decimal) / kol_avg as cost_by_one_avg,
-- 	kol_avg_2019,
-- 	cost_avg_2019,
-- 	kol_avg_2020,
-- 	cost_avg_2020,
-- 	kol_avg_2021,
-- 	cost_avg_2021
-- from (
-- 	select
-- 		SUBSTRING(id, 1, 4) as tnveds_part,
-- 		count(*) as tnveds_count
-- 	from tnveds
-- 	group by tnveds_part
-- ) as a3
-- left join
-- 	(select
-- 	 	tnveds_part as note_tnveds_part,
-- 		 count(*) as notes_count,
-- 		 avg(cost) as cost_avg,
-- 		 avg(kol) as kol_avg
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 4) as tnveds_part,
-- 			cost,
-- 			kol
-- 		from notes
-- 	) as a1
-- 	group by tnveds_part) as a2
-- on tnveds_part = note_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2019_tnveds_part,
-- 	 	avg(kol) as kol_avg_2019,
-- 	 	avg(cost) as cost_avg_2019
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 4) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2019
-- 	) as b1
-- 	group by tnveds_part) as b2
-- on tnveds_part = notes2019_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2020_tnveds_part,
-- 	 	avg(kol) as kol_avg_2020,
-- 	 	avg(cost) as cost_avg_2020
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 4) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2020
-- 	) as c1
-- 	group by tnveds_part) as c2
-- on tnveds_part = notes2020_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2021_tnveds_part,
-- 	 	avg(kol) as kol_avg_2021,
-- 	 	avg(cost) as cost_avg_2021
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 4) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2021
-- 	) as d1
-- 	group by tnveds_part) as d2
-- on tnveds_part = notes2021_tnveds_part
-- order by tnveds_part asc) as x1
-- -- where (kol_avg_2019 > kol_avg_2020 and kol_avg_2020 > kol_avg_2021) or (kol_avg_2019 < kol_avg_2020 and kol_avg_2020 < kol_avg_2021)
-- where (cost_avg_2019 > cost_avg_2020 and cost_avg_2020 > cost_avg_2021) or (cost_avg_2019 < cost_avg_2020 and cost_avg_2020 < cost_avg_2021)
-- -- RESULT: all=1328, kol_rules=307, cost_rules=484

-- select count(*)
-- from
-- (
-- select
-- 	tnveds_part,
-- 	tnveds_count,
-- 	notes_count,
-- 	kol_avg,
-- 	cost_avg,
-- 	cast(cost_avg as decimal) / kol_avg as cost_by_one_avg,
-- 	kol_avg_2019,
-- 	cost_avg_2019,
-- 	kol_avg_2020,
-- 	cost_avg_2020,
-- 	kol_avg_2021,
-- 	cost_avg_2021
-- from (
-- 	select
-- 		SUBSTRING(id, 1, 6) as tnveds_part,
-- 		count(*) as tnveds_count
-- 	from tnveds
-- 	group by tnveds_part
-- ) as a3
-- left join
-- 	(select
-- 	 	tnveds_part as note_tnveds_part,
-- 		 count(*) as notes_count,
-- 		 avg(cost) as cost_avg,
-- 		 avg(kol) as kol_avg
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 6) as tnveds_part,
-- 			cost,
-- 			kol
-- 		from notes
-- 	) as a1
-- 	group by tnveds_part) as a2
-- on tnveds_part = note_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2019_tnveds_part,
-- 	 	avg(kol) as kol_avg_2019,
-- 	 	avg(cost) as cost_avg_2019
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 6) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2019
-- 	) as b1
-- 	group by tnveds_part) as b2
-- on tnveds_part = notes2019_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2020_tnveds_part,
-- 	 	avg(kol) as kol_avg_2020,
-- 	 	avg(cost) as cost_avg_2020
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 6) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2020
-- 	) as c1
-- 	group by tnveds_part) as c2
-- on tnveds_part = notes2020_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2021_tnveds_part,
-- 	 	avg(kol) as kol_avg_2021,
-- 	 	avg(cost) as cost_avg_2021
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 6) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2021
-- 	) as d1
-- 	group by tnveds_part) as d2
-- on tnveds_part = notes2021_tnveds_part
-- order by tnveds_part asc) as x1
-- -- where (kol_avg_2019 > kol_avg_2020 and kol_avg_2020 > kol_avg_2021) or (kol_avg_2019 < kol_avg_2020 and kol_avg_2020 < kol_avg_2021)
-- where (cost_avg_2019 > cost_avg_2020 and cost_avg_2020 > cost_avg_2021) or (cost_avg_2019 < cost_avg_2020 and cost_avg_2020 < cost_avg_2021)
-- -- RESULT: all=7086, kol_rules=1090, cost_rules=2044

-- select count(*)
-- from
-- (
-- select
-- 	tnveds_part,
-- 	tnveds_count,
-- 	notes_count,
-- 	kol_avg,
-- 	cost_avg,
-- 	cast(cost_avg as decimal) / kol_avg as cost_by_one_avg,
-- 	kol_avg_2019,
-- 	cost_avg_2019,
-- 	kol_avg_2020,
-- 	cost_avg_2020,
-- 	kol_avg_2021,
-- 	cost_avg_2021
-- from (
-- 	select
-- 		SUBSTRING(id, 1, 8) as tnveds_part,
-- 		count(*) as tnveds_count
-- 	from tnveds
-- 	group by tnveds_part
-- ) as a3
-- left join
-- 	(select
-- 	 	tnveds_part as note_tnveds_part,
-- 		 count(*) as notes_count,
-- 		 avg(cost) as cost_avg,
-- 		 avg(kol) as kol_avg
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 8) as tnveds_part,
-- 			cost,
-- 			kol
-- 		from notes
-- 	) as a1
-- 	group by tnveds_part) as a2
-- on tnveds_part = note_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2019_tnveds_part,
-- 	 	avg(kol) as kol_avg_2019,
-- 	 	avg(cost) as cost_avg_2019
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 8) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2019
-- 	) as b1
-- 	group by tnveds_part) as b2
-- on tnveds_part = notes2019_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2020_tnveds_part,
-- 	 	avg(kol) as kol_avg_2020,
-- 	 	avg(cost) as cost_avg_2020
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 8) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2020
-- 	) as c1
-- 	group by tnveds_part) as c2
-- on tnveds_part = notes2020_tnveds_part
-- left join
-- 	(select
-- 	 	tnveds_part as notes2021_tnveds_part,
-- 	 	avg(kol) as kol_avg_2021,
-- 	 	avg(cost) as cost_avg_2021
-- 	from (
-- 		select
-- 			SUBSTRING(tnved, 1, 8) as tnveds_part,
-- 			cost,
-- 			kol,
-- 			year
-- 		from notes
-- 		where year = 2021
-- 	) as d1
-- 	group by tnveds_part) as d2
-- on tnveds_part = notes2021_tnveds_part
-- order by tnveds_part asc) as x1
-- where (kol_avg_2019 > kol_avg_2020 and kol_avg_2020 > kol_avg_2021) or (kol_avg_2019 < kol_avg_2020 and kol_avg_2020 < kol_avg_2021)
-- -- where (cost_avg_2019 > cost_avg_2020 and cost_avg_2020 > cost_avg_2021) or (cost_avg_2019 < cost_avg_2020 and cost_avg_2020 < cost_avg_2021)
-- -- RESULT: all=17377, kol_rules=1752, cost_rules=3512

select count(*)
from
(
  select
  tnveds_part,
  tnveds_count,
  notes_count,
  kol_avg,
  cost_avg,
  cast(cost_avg as decimal) / kol_avg as cost_by_one_avg,
  kol_avg_2019,
  cost_avg_2019,
  kol_avg_2020,
  cost_avg_2020,
  kol_avg_2021,
  cost_avg_2021
  from (
    select
    SUBSTRING(id, 1, 2) as tnveds_part,
    count(*) as tnveds_count
    from tnveds
    group by tnveds_part
  ) as a3
  left join
  (select
  tnveds_part as note_tnveds_part,
  count(*) as notes_count,
  avg(cost) as cost_avg,
  avg(kol) as kol_avg
  from (
    select
    SUBSTRING(tnved, 1, 2) as tnveds_part,
    cost,
    kol
    from notes
  ) as a1
  group by tnveds_part) as a2
  on tnveds_part = note_tnveds_part
  left join
  (select
  tnveds_part as notes2019_tnveds_part,
  avg(kol) as kol_avg_2019,
  avg(cost) as cost_avg_2019
  from (
    select
    SUBSTRING(tnved, 1, 2) as tnveds_part,
    cost,
    kol,
    year
    from notes
    where year = 2019
  ) as b1
  group by tnveds_part) as b2
  on tnveds_part = notes2019_tnveds_part
  left join
  (select
  tnveds_part as notes2020_tnveds_part,
  avg(kol) as kol_avg_2020,
  avg(cost) as cost_avg_2020
  from (
    select
    SUBSTRING(tnved, 1, 2) as tnveds_part,
    cost,
    kol,
    year
    from notes
    where year = 2020
  ) as c1
  group by tnveds_part) as c2
  on tnveds_part = notes2020_tnveds_part
  left join
  (select
  tnveds_part as notes2021_tnveds_part,
  avg(kol) as kol_avg_2021,
  avg(cost) as cost_avg_2021
  from (
    select
    SUBSTRING(tnved, 1, 2) as tnveds_part,
    cost,
    kol,
    year
    from notes
    where year = 2021
  ) as d1
  group by tnveds_part) as d2
  on tnveds_part = notes2021_tnveds_part
  order by tnveds_part asc) as x1
-- where (kol_avg_2019 > kol_avg_2020 and kol_avg_2020 > kol_avg_2021) or (kol_avg_2019 < kol_avg_2020 and kol_avg_2020 < kol_avg_2021)
where
kol_avg_2019 IS NOT NULL and
kol_avg_2020 IS NOT NULL and
kol_avg_2021 IS NOT NULL and
cost_avg_2019 IS NOT NULL and
cost_avg_2020 IS NOT NULL and
cost_avg_2021 IS NOT NULL and
((kol_avg_2019 > kol_avg_2020 and
kol_avg_2020 > kol_avg_2021) or
(kol_avg_2019 < kol_avg_2020 and
kol_avg_2020 < kol_avg_2021))
-- ((cost_avg_2019 > cost_avg_2020 and
--  cost_avg_2020 > cost_avg_2021) or
--  (cost_avg_2019 < cost_avg_2020 and
--   cost_avg_2020 < cost_avg_2021))

-- RESULT: all=31511, kol_rules=1992, cost_rules=4168

-- RESULT 2: all=97, kol_rules=25, cost_rules=22
-- RESULT 4: all=1328, kol_rules=307, cost_rules=484
-- RESULT 6: all=7086, kol_rules=1090, cost_rules=2044
-- RESULT 8: all=17377, kol_rules=1752, cost_rules=3512
-- RESULT 10: all=31511, kol_rules=1992, cost_rules=4168

-- not null
-- not null: 2=88 4=738 6=2621 8=4196 10=4851
-- RESULT 2: all=88, kol_rules=35, cost_rules=19
-- RESULT 4: all=738, kol_rules=307, cost_rules=296
-- RESULT 6: all=2621, kol_rules=1090, cost_rules=1066
-- RESULT 8: all=4196, kol_rules=1752, cost_rules=1734
-- RESULT 10: all=4851, kol_rules=1992, cost_rules=2003
