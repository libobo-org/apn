-- select tnved
-- from notes
-- where length(tnved) = 10
-- limit 10;

-- select *
-- from tnveds
-- where length(id) <> 10
-- limit 100;

-- select year, count(*)
-- from notes
-- group by year;

-- select tnved, count(*)
-- from notes
-- group by tnved;

-- select SUBSTRING(id, 1, 2) as tnveds_2, count(*) as tnveds_count
-- from tnveds
-- group by tnveds_2;

-- select tnveds_2, tnveds_count, notes_count from (
-- 	select SUBSTRING(id, 1, 2) as tnveds_2, count(*) as tnveds_count
-- 	from tnveds
-- 	group by tnveds_2
-- ) as a2
-- left join
-- 	(select tnved_2 as note_tnved_2, count(*) as notes_count
-- 	from (
-- 		select SUBSTRING(tnved, 1, 2) as tnved_2
-- 		from notes
-- 	) as a1
-- 	group by tnved_2) as a3
-- on tnveds_2 = note_tnved_2;

-- select tnveds_part, tnveds_count, notes_count from (
-- 	select SUBSTRING(id, 1, 2) as tnveds_part, count(*) as tnveds_count
-- 	from tnveds
-- 	group by tnveds_part
-- ) as a2
-- left join
-- 	(select tnveds_part as note_tnveds_part, count(*) as notes_count
-- 	from (
-- 		select SUBSTRING(tnved, 1, 2) as tnveds_part
-- 		from notes
-- 	) as a1
-- 	group by tnveds_part) as a3
-- on tnveds_part = note_tnveds_part;

-- select tnved_2, count(*)
-- from (
-- 	select SUBSTRING(tnved, 1, 2) as tnved_2
-- 	from notes
-- ) as a1
-- group by tnved_2;

-- select tnved_4, count(*)
-- from (
-- 	select SUBSTRING(tnved, 1, 4) as tnved_4
-- 	from notes
-- ) as a1
-- group by tnved_4;

-- select count(*)
-- from (
-- 	select tnved, count(*)
-- 	from notes
-- 	group by tnved
-- 	where
-- ) as a1;

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

select count(*) from (
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
  where
  kol_avg_2019 IS NOT NULL and
  kol_avg_2020 IS NOT NULL and
  kol_avg_2021 IS NOT NULL and
  cost_avg_2019 IS NOT NULL and
  cost_avg_2020 IS NOT NULL and
  cost_avg_2021 IS NOT NULL
  order by tnveds_part asc) as x1;

-- 2=97 4=1328 6=7086 8=17377 10=31511
-- not null: 2=88 4=738 6=2621 8=4196 10=4851
