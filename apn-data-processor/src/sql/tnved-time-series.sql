select
  year,
  month,
  ex_notes_count,
  im_notes_count,
  ex_cost_sum,
  im_cost_sum,
  ex_kol_sum,
  im_kol_sum,
  cast(ex_cost_sum as decimal) / ex_kol_sum as ex_cost_by_one_kol_avg,
  cast(im_cost_sum as decimal) / im_kol_sum as im_cost_by_one_kol_avg,
  cast(ex_cost_sum as decimal) / ex_notes_count as ex_cost_by_one_note_avg,
  cast(im_cost_sum as decimal) / im_notes_count as im_cost_by_one_note_avg
from (
  select
    year,
    month,
    count(case when ex_im = 0 then 1 else 0 end) as ex_notes_count,
    count(case when ex_im = 1 then 1 else 0 end) as im_notes_count,
    sum(case when ex_im = 0 then cost else 0 end) as ex_cost_sum,
    sum(case when ex_im = 1 then cost else 0 end) as im_cost_sum,
    sum(case when ex_im = 0 then kol else 0 end) as ex_kol_sum,
    sum(case when ex_im = 1 then kol else 0 end) as im_kol_sum
  from notes
  --  where tnved_id = '0102211000'
  --  where substring(tnved_id, 1, 4) = '0102'
  where substring(tnved_id, 1, $1) = $2::text
  group by year, month
) as stat order by year asc, month asc limit 100;
