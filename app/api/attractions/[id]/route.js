import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function GET(request, { params }) {
  const { id } = params;          // no need for await here
  const promisePool = mysqlPool.promise();

  const [rows] = await promisePool.query(
    'SELECT * FROM attractions WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { message: `Attraction with id ${id} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}

// UPDATE
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { name, detail, coverimage, latitude, longitude } = body;

  const promisePool = mysqlPool.promise();

  const [result] = await promisePool.query(
    `UPDATE attractions
     SET name = ?, detail = ?, coverimage = ?, latitude = ?, longitude = ?
     WHERE id = ?`,
    [name, detail, coverimage, latitude, longitude, id]
  );

  if (result.affectedRows === 0) {
    return NextResponse.json(
      { message: `Attraction with id ${id} not found.` },
      { status: 404 }
    );
  }

  // return the updated row (optional)
  const [rows] = await promisePool.query(
    'SELECT * FROM attractions WHERE id = ?',
    [id]
  );

  return NextResponse.json({
    message: 'Attraction updated successfully',
    attraction: rows[0],
  });
}

// DELETE
export async function DELETE(request, { params }) {
  const { id } = params;
  const promisePool = mysqlPool.promise();

  const [result] = await promisePool.query(
    'DELETE FROM attractions WHERE id = ?',
    [id]
  );

  if (result.affectedRows === 0) {
    return NextResponse.json(
      { message: `Attraction with id ${id} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: 'Attraction deleted successfully' });
}
