create table if not exists public.tnveds_niches (
  tnved_id varchar(10) NOT NULL,
  ifk bigint,
  ifv bigint,
  ifv0 bigint,
  iek bigint,
  iev bigint,
  iev0 bigint,
  efk bigint,
  efv bigint,
  efv0 bigint,
  eek bigint,
  eev bigint,
  eev0 bigint,
  ck bigint,
  cv bigint,
  cv0 bigint,
  orgCount bigint,
  indexLIBOBO bigint
);

ALTER TABLE public.tnveds_niches OWNER TO postgres;

ALTER TABLE ONLY public.tnveds_niches
ADD CONSTRAINT tnveds_niches_pkey PRIMARY KEY (tnved_id);

ALTER TABLE ONLY public.tnveds_niches
ADD CONSTRAINT fk_tnveds_niches_tnved_id__id FOREIGN KEY (tnved_id) REFERENCES public.tnveds(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
